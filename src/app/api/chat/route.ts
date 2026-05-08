import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { toUIMessageStream, toBaseMessages } from "@ai-sdk/langchain";
import { createUIMessageStreamResponse, UIMessage } from "ai";
import { z } from "zod";
import { RESUME } from "@/example-data/Resume";
import Articles from "@/example-data/Articles";
import Projects from "@/example-data/Projects";

const MAX_INPUT_LENGTH = 2000;
const MAX_MESSAGES = 20;

const SYSTEM_PROMPT = `You are a sharp, knowledgeable AI assistant embedded in Lukas A Sorensen's portfolio website. \
Your primary audience is recruiters and hiring managers evaluating Lukas as a candidate.

About Lukas: He is a seasoned Full Stack Engineer with 10+ years of experience building production-grade web \
applications, leading technical architecture, and mentoring engineering teams.

Guidelines:
- Be concise but persuasive. Lead with impact and business value, then back it up with technical specifics.
- Highlight his technical breadth: frontend (React, Next.js, Vue, Angular), backend (Node.js, Express, MongoDB, \
PostgreSQL, Redis), mobile (React Native/Expo), cloud (AWS), and tooling (Docker, CI/CD, Webpack, TypeScript).
- Use the get_resume tool for any question about experience, work history, skills, accomplishments, or qualifications.
- Use the get_contact_info tool when asked how to reach Lukas or for contact details.
- Use the get_blog_and_projects tool for questions about portfolio work, technical writing, blog posts, or shipped projects.
- Synthesize tool results into crisp, recruiter-friendly responses — avoid dumping raw data.
- If asked something you cannot answer about Lukas, say so honestly and suggest reaching out via his contact info.`;

// Tool: fetch resume data
const getResumeTool = tool(
  async () => JSON.stringify(RESUME, null, 2),
  {
    name: "get_resume",
    description:
      "Fetches Lukas A Sorensen's full resume including work experience, skills, education, and accomplishments. " +
      "Use whenever the user asks about his background, career history, qualifications, technical skills, or anything professional.",
    schema: z.object({}),
  },
);

// Tool: fetch contact information
const getContactInfoTool = tool(
  async () => JSON.stringify(RESUME.contact, null, 2),
  {
    name: "get_contact_info",
    description:
      "Returns Lukas A Sorensen's contact information including email, website, GitHub, and LinkedIn. " +
      "Use whenever the user asks how to reach Lukas or requests his contact details.",
    schema: z.object({}),
  },
);

// Tool: fetch blog posts and portfolio projects
const getBlogAndProjectsTool = tool(
  async () => {
    const projects = Projects.map(({ imageSrc: _imageSrc, detailImages: _detailImages, ...rest }) => rest);

    const articles = Articles.map(({ id, title, articleDescription, createdDate }) => ({
      id,
      title,
      description: articleDescription,
      createdDate,
    }));

    return JSON.stringify({ projects, articles }, null, 2);
  },
  {
    name: "get_blog_and_projects",
    description:
      "Returns Lukas A Sorensen's portfolio projects and blog articles. " +
      "Use whenever the user asks about his shipped work, portfolio, technical writing, side projects, or areas of technical interest.",
    schema: z.object({}),
  },
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const uiMessages: UIMessage[] = body.messages ?? [];

    if (!Array.isArray(uiMessages) || uiMessages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Enforce history length limit
    const trimmedMessages = uiMessages.slice(-MAX_MESSAGES);

    // Validate last user message length
    const lastMessage = trimmedMessages[trimmedMessages.length - 1];
    const lastTextPart = lastMessage?.parts?.find((p: { type: string }) => p.type === "text") as
      | { type: "text"; text: string }
      | undefined;
    if (!lastTextPart?.text) {
      return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
    }
    if (lastTextPart.text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({ error: "Message too long. Please keep it under 2000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "LLM API key is not configured." }, { status: 500 });
    }

    const model = new ChatOpenAI({
      openAIApiKey: apiKey,
      modelName: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      streaming: true,
      temperature: 0.7,
    });

    // Convert UIMessages to LangChain BaseMessages
    const baseMessages = await toBaseMessages(trimmedMessages);
    const agentMessages = [new SystemMessage(SYSTEM_PROMPT), ...baseMessages];

    // Create a ReAct agent with all recruiter-facing tools
    const agent = createReactAgent({ llm: model, tools: [getResumeTool, getContactInfoTool, getBlogAndProjectsTool] });

    const agentStream = await agent.stream(
      { messages: agentMessages },
      { streamMode: ["values", "messages"] },
    );

    return createUIMessageStreamResponse({
      stream: toUIMessageStream(agentStream),
    });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
