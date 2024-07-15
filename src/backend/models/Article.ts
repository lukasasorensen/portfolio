import { ICarouselImage } from "@/components/common/Carousel";
import mongoose from "mongoose";

export interface Article extends mongoose.Document {
  title: string;
  articleText: string;
  articleDescription?: string;
  imageSrc: string;
  detailImages?: ICarouselImage[];
  createdDate: Date;
}

/* Articles for blog */
const ArticleSchema = new mongoose.Schema<Article>({
  title: {
    /* article title */

    type: String,
    required: true
  },
  articleText: {
    /* main content for article */

    type: String,
    required: true,
  },
  articleDescription: {
    /* article short description for preview */

    type: String
  },
  imageSrc: {
    /* url of image for article */

    type: String,
  },
  detailImages: {
    /* array of images for article image rotator, optional */

    type: Array<Object>,
  },
  createdDate: {
    /* created date of article */

    type: Date,
  },
});

export default mongoose.models.Article || mongoose.model<Article>("articles", ArticleSchema);
