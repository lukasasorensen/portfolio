import { ICarouselImage } from "@/components/common/Carousel";

export interface IArticle {
  id: string;
  title: string;
  articleText: string;
  articleDescription?: string;
  imageSrc: string;
  detailImages?: ICarouselImage[];
  createdDate: Date;
}

const Articles: IArticle[] = [
  {
    id: 'sync-dotfiles-article',
    title: 'How to Sync your dotfiles across different machines. Mac to Windows to Linux',
    articleText: `I%20recently%20went%20back%20to%20using%20VIM%20and%20took%20the%20time%20to%20do%20a%20deep%20dive%20on%20my%20dotfiles.%20I%20had%20configured%20the%20perfect%20Neovim%20setup%20on%20my%20work%20MacBook%2C%20but%20when%20I%20switched%20to%20my%20desktop%20Windows%20machine%2C%20I%20found%20that%20my%20new%20shortcuts%2C%20theme%2C%20and%20plugins%20were%20missing!%0A%0AIn%20order%20to%20Sync%20these%20configurations%20manually%2C%20requires%20locating%20all%20necessary%20files%20(e.g.%2C%20%60~%2F.zshrc%2C%20~%2F.config%2Fnvim%60%20)%2C%20copying%20them%20to%20a%20new%20folder%2C%20uploading%20them%20to%20GitHub%2C%20pulling%20them%20onto%20the%20other%20machine%2C%20and%20pasting%20them%20into%20the%20correct%20locations.%20This%20is%20where%20Chezmoi%20comes%20in%20handy!%0A%0A%23%23%23%20Syncing%20with%C2%A0Chezmoi%0A%0A%5Bchezmoi%5D(https%3A%2F%2Fwww.chezmoi.io%2F)%20is%20an%20easy%20to%20use%20CLI%20for%20managing%20your%20dotfiles%20or%20any%20other%20configuration%20file%20you%20would%20like%20to%20sync%20across%20multiple%20devices.%20You%20can%20add%20your%20files%20or%20directories%20to%20chezmoi%20to%20manage%20and%0A%0A%5Binstall%20chezmoi%5D(https%3A%2F%2Fwww.chezmoi.io%2Finstall%2F)%20(I%20prefer%20homebrew%20for%20mac%2Flinux)%0A%0A%60%60%60%0A%24%20brew%20install%20chezmoi%0A%60%60%60%0A%0Ainitialize%0A%0A%60%60%60%0A%24%20chezmoi%20init%0A%60%60%60%0A%0Aadd%20the%20dotfiles%20you%20want%20to%20sync.%0A%0A%60%60%60%0A%24%20chezmoi%20add%20~%2F.zshrc%20%20%0A%24%20chezmoi%20add%20~%2F.oh-my-zsh%20%20%0A%24%20chezmoi%20add%20~%2F.config%2Fnvim%20%20%0A%24%20chezmoi%20add%20~%2F.config%2Fkarabiner%0A%60%60%60%0A%0AIt%20is%20recommended%20you%20do%20NOT%20add%20the%20entire%20%60~%2F.config%60%20directory.%20There%20can%20be%20a%20LOT%20of%20files%20in%20here%2C%20and%20some%20that%20change%20quite%20frequently%20that%20will%20make%20syncing%20difficult.%20Try%20to%20choose%20only%20the%20directories%20and%20files%20that%20you%20KNOW%20you%20want%20sync%E2%80%99d.%0A%0Ato%20apply%20your%20changes%20run%0A%0A%60%60%60%0A%24%20chezmoi%20apply%0A%60%60%60%0A%0AAnytime%20you%20want%20to%20change%20a%20file%20managed%20by%20chezmoi%20you%20can%20edit%20the%20file%20in%20whatever%20text%20editor%20you%20want.%20When%20you%E2%80%99re%20done%20add%20the%20file%20or%20directory%20you%20changed%20again%20with%20the%20%60chezmoi%20add%60%20command%20like%20previous%20add%20examples%20and%20then%20run%20%60chezmoi%20apply%60%20again%20and%20it%20will%20update%20the%20managed%20version.%0A%0AAlternatively%2C%20if%20you%20don%E2%80%99t%20mind%20using%20vim%20to%20edit%2C%20then%20you%20can%20edit%20a%20file%20and%20apply%20the%20update%20together%20using%20the%20%60chezmoi%20edit%60%20command.%20Running%20that%20command%20followed%20by%20a%20file%20path%2C%20will%20open%20that%20file%20in%20vim%20and%20run%20apply%20when%20you%C2%A0%60%3Awq%60%C2%A0.%0A%0A%23%23%23%23%20Sync%20dotfiles%20to%20new%C2%A0Machine%0A%0AOnce%20you%E2%80%99ve%20added%20all%20your%20files%20to%20chezmoi%20to%20manage%20you%E2%80%99ll%20want%20to%20get%20the%20files%20onto%20git!%20First%20create%20a%20repository%20in%20your%20preferred%20git%20service%20(I%20use%20github)%20called%20%60dotfiles%60%20with%20the%20default%20branch%20set%20to%20%60main%60%C2%A0.%20Chezmoi%20will%20look%20for%20this%20repo%20name%20and%20branch%20name%20so%20it%20is%20important%20to%20name%20them%20that%2C%20but%20%5Byou%20can%20change%20that%20setting%20if%20needed%5D(https%3A%2F%2Fwww.chezmoi.io%2Fuser-guide%2Fadvanced%2Fcustomize-your-source-directory%2F)%0A%0AOpen%20the%20chezmoi%20managed%20folder%20on%20your%20machine%20by%20running%20%60chezmoi%20cd%60This%20will%20automatically%20cd%20you%20into%20the%20directory%20that%20chezmoi%20is%20using%20to%20manage%20all%20of%20your%20dotfiles.%20If%20you%20ls%20the%20files%20you%20will%20see%20that%20they%20are%20renamed%20to%20%60dot_zshrc%60%C2%A0%2C%20don%E2%80%99t%20worry%20that%E2%80%99s%20correct!%0A%0AAdd%20your%20files%20to%20your%20git%20remote%20repo%20like%20you%20would%20any%20other%20repository.%0A%0A%60%60%60%0A%24%20chezmoi%20cd%20%20%0A%24%20git%20remote%20add%20origin%20https%3A%2F%2Fgithub.com%2F%24GITHUB_USERNAME%2Fdotfiles.git%20%20%0A%24%20git%20push%20-u%20origin%20main%0A%60%60%60%0A%0AOn%20the%20new%20machine%2C%20install%20chezmoi%20just%20as%20we%20did%20before%20but%20instead%20of%20%60chezmoi%20init%60%20we%20will%20run.%0A%0A%60%60%60%0A%24%20chezmoi%20init%20https%3A%2F%2Furl-to-your-git-profile%2Fdotfiles.git%20%20%20%0A%24%20chezmoi%20apply%0A%60%60%60%0A%0AIf%20the%20files%20you%20are%20syncing%20already%20exist%20and%20do%20not%20match%20you%20will%20get%20a%20prompt%20warning%20you%20the%20files%20are%20about%20to%20be%20overridden%20with%20a%20git%20diff%20of%20the%20changes.%20Press%20%60o%60%20to%20accept%20each%20file%20change%20and%20overwrite.%20or%20%60a%60%20to%20overwrite%20them%20all.%0A%0A%23%23%23%23%20Managing%20Differences%20between%C2%A0Machines%0A%0AYou%20might%20run%20into%20the%20problem%20of%20your%20configuration%20works%20on%20one%20machine%20but%20not%20the%20other%20because%20a%20file%20path%20is%20different%20or%20a%20tool%20isn%E2%80%99t%20supported.%20In%20order%20to%20solve%20this%20you%20can%20create%20a%20%5Btemplate%20with%20chezmoi%5D(https%3A%2F%2Fwww.chezmoi.io%2Fuser-guide%2Fmanage-machine-to-machine-differences%2F).%20This%20allows%20you%20to%20create%20if%2Felse%20statements%20and%20variables%20for%20the%20template%20to%20use%20when%20syncing.%0A%0ATo%20get%20started%20with%20a%20template%20add%20the%20%60--template%60%20to%20the%20add%20command%20for%20the%20file%20you%20want%20to%20use%20a%20template%20for.%0A%0A%60%60%60%0A%24%20chezmoi%20add%20--template%20~%2F.zshrc%0A%60%60%60%0A%0AOnce%20you%20do%20this%2C%20you%20will%20HAVE%20to%20edit%20the%20file%20with%20the%20%60chezmoi%20edit%60%20command.%0A%0A%60%60%60%0A%24%20chezmoi%20edit%20~%2F.zshrc%0A%60%60%60%0A%0AOnce%20you%20do%20this%2C%20you%20can%20use%20the%20templating%20syntax%20to%20fix%20your%20machine%20to%20machine%20differences.%0A%0A%60%60%60%0A%23%23%20if%20mac%20%20%0A%7B%7Bif%20eq%20.chezmoi.os%20%22darwin%22%7D%7D%20%20%0A%20%20%0A%23%20Tokens%20I%20dont%20want%20exposed%20%20%0A%5B%20-f%20~%2F.tokens%2Fenv.sh%20%5D%20%26%26%20source%20~%2F.tokens%2Fenv.sh%20%20%0A%20%20%0A%23%20different%20path%20%20%0Asource%20%2Fopt%2Fhomebrew%2Fshare%2Fzsh-syntax-highlighting%2Fzsh-syntax-highlighting.zsh%20%20%0A%20%20%0A%23%20use%20global%20vars%20to%20write%20less%20code%20in%20if%2Felses%20%20%0Aexport%20ZSH%3D%22%2Fopt%2Fhomebrew%2Fshare%2Foh-my-zsh%2F.oh-my-zsh%22%20%20%0A%7B%7B%20end%20-%7D%7D%20%20%0A%20%20%0A%23%23%20if%20linux%20%20%0A%7B%7Bif%20eq%20.chezmoi.os%20%22linux%22%7D%7D%20%20%0A%20%20%0A%23%20Path%20to%20your%20oh-my-zsh%20installation.%20%20%0Aexport%20ZSH%3D%22%24HOME%2F.oh-my-zsh%22%20%20%0A%20%20%0A%23%20zsh%20syntax%20highlighting%20%20%0Asource%20%2Fhome%2Flinuxbrew%2F.linuxbrew%2Fshare%2Fzsh-syntax-highlighting%2Fzsh-syntax-highlighting.zsh%20%20%0A%7B%7Bend%20-%7D%7D%0A%60%60%60%0A%0ARefer%20to%20the%20%5Bdocumentation%5D(https%3A%2F%2Fwww.chezmoi.io%2Fuser-guide%2Ftemplating%2F)%20for%20a%20more%20detailed%20explanation%20on%20the%20templating%20syntax.%0A%0A%3E%20I%20mentioned%20I%20was%20syncing%20between%20my%20Mac%20and%20PC.%20On%20Windows%20I%20am%20actually%20running%20the%20%5BWindows%20Subsystem%20for%20Linux%5D(https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fwindows%2Fwsl%2Fabout)%20which%20is%20a%20great%20way%20for%20mac%2Flinux%20users%20to%20develop%20on%20Windows%2C%20but%20chezmoi%20does%20support%20windows%20powershell%20and%20can%20be%20installed%20via%20choco.`,
    articleDescription: 'Keep your configurations in sync between multiple computers across multiple operating systems.',
    imageSrc: '/images/syncdotfilesarticleimage.png',
    createdDate: new Date('2024-05-14')
  },
  {
    id: 'self-host-docker-cloudflare',
    title: 'Easy Self Hosting with Docker and Cloudflare',
    articleText: `%3E%20**TLDR%3B**%20You%20can%20use%20Docker%20to%20spin%20up%20your%20service%20easy%20with%20docker%20compose%2C%20and%20then%20allow%20that%20to%20be%20accessible%20from%20outside%20your%20network%20**without**%20Port%20Forwarding%20with%20Cloudflared%20Zero-Trust%20Tunnels%0A%0A%23%23%23%20Forward%0A%0AI%20started%20my%20homelab%20journey%20recently.%20I%20started%20with%20just%20wanting%20Plex%20and%20a%20Valheim%20Server%2C%20but%20in%20a%20way%20familiar%20to%20many%2C%20it%20quickly%20grew.%20I%20had%20my%20services%20running%20locally%2C%20but%20I%20wanted%20things%20like%20RSS%2C%20Home%20Assistant%20and%20Plex%20to%20be%20accessible%20outside%20my%20network%20on%20my%20own%20domain.%0A%0A%3E%20If%20you%20already%20understand%20Docker%20and%20home%20neteworking%20and%20just%20want%20to%20learn%20about%20Cloudflare%20Tunnels%2C%20skip%20to%20**Connect%20Externally%20with%20Cloudflare%20Tunnels.**%0A%0A%23%23%23%20Hardware%0A%0ADepending%20on%20what%20you%20want%20to%20run%2C%20you%20probably%20don%E2%80%99t%20need%20very%20much%20processing%20power.%0A%0AI%20got%20lucky%20and%20grabbed%20an%20%5BHP%20ProDesk%20G2%20Mini%5D(https%3A%2F%2Fsupport.hp.com%2Fus-en%2Fdocument%2Fc04819833)%20that%20was%20in%20a%20free%2Frecycle%20pile.%20It%20had%20no%20SSD%20and%20only%204GB%20RAM%2C%20so%20I%20put%20a%20spare%20SSD%20in%20it%20and%20picked%20up%2016%20GB%20of%20RAM%20for%20about%20%2430%2C%20ironically%20the%20most%20expensive%20part%20of%20this%20project%2C%20for%20me.%0A%0AThis%20computer%20is%20by%20no%20means%20fast%2C%20but%20it%20is%20more%20than%20capable%20in%20running%20HomeAssistant%2C%20PiHole%2C%20Plex%2C%20and%20more.%20It%20can%20even%20run%20a%20Minecraft%2FValheim%20Server%20for%20you%20and%20a%20few%20friends.%0A%0A%23%23%23%20Why%20Docker%3F%0A%0A-%20Easy%20to%20use.%20With%20Docker%20Compose%2C%20YAML%20compose%20configs%20files%20are%20easy%20to%20create%20and%20manage.%0A-%20Easy%20to%20see%20all%20running%20tasks%20and%20manage%20them.%0A-%20Containers%20are%20isolated%20environments.%0A-%20Each%20Container%20handle%20their%20own%20dependencies%20allowing%20for%20different%20versions%20of%20them.%0A-%20Services%20that%20are%20installed%20as%20an%20OS%20(like%20homeassistant)%20can%20be%20running%20along%20side%20other%20services%20without%20the%20need%20for%20a%20VM.%0A%0A%23%23%23%20Why%20Cloudflare%3F%0A%0A-%20Hide%20Public%20IP%20Address%0A-%20No%20Port%20Forwarding%20on%20your%20router%0A-%20Automatic%20HTTPS%0A-%20Again%2C%20easy%20to%20use%20and%20setup.%0A-%20Free%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*6334tvIj94XYKRBtZIRtWA.png)%0A%0A%23%23%23%20Setting%20Up%0A%0AI%E2%80%99m%20running%20Linux%20Debian%20headless%20on%20my%20HP%20mini%20with%20SSH%20access%2C%20but%20you%20can%20use%20a%20different%20Linux%20Distro%2C%20MacOS%2C%20or%20Windows%20via%20WSL2.%0A%0A%23%23%23%23%20Install%20Docker%20and%20Docker%C2%A0Compose%0A%0A%5B**Overview%20of%20installing%20Docker%20Compose**%20%20%0A_Learn%20how%20to%20install%20Docker%20Compose.%20Compose%20is%20available%20natively%20on%20Docker%20Desktop%2C%20as%20a%20Docker%20Engine%20plugin%2C%20and%20as%E2%80%A6_docs.docker.com%5D(https%3A%2F%2Fdocs.docker.com%2Fcompose%2Finstall%2F%20%22https%3A%2F%2Fdocs.docker.com%2Fcompose%2Finstall%2F%22)%5B%5D(https%3A%2F%2Fdocs.docker.com%2Fcompose%2Finstall%2F)%0A%0AFollow%20the%20Instructions%20to%20install%20Docker%20and%20Docker%20Compose.%0A%0A%23%23%23%23%20Create%20a%20Docker%20Compose%C2%A0File%0A%0A%60%60%60%0A%24%20mkdir%20homeassistant%20%20%0A%24%20cd%20homeassistant%20%20%0A%24%20touch%20docker-compose.yml%20%20%0A%24%20vi%20docker-compose.yml%0A%60%60%60%0A%0A%60%60%60%0Aversion%3A%20'3'%20%20%0Aservices%3A%20%20%0A%20%20homeassistant%3A%20%20%0A%20%20%20%20container_name%3A%20homeassistant%20%20%0A%20%20%20%20image%3A%20%22ghcr.io%2Fhome-assistant%2Fhome-assistant%3Astable%22%20%20%0A%20%20%20%20volumes%3A%20%20%0A%20%20%20%20%20%20-%20%2Fhome%2F%3Cusername%3E%2F.homeassistant%3A%2Fconfig%20%20%0A%20%20%20%20%20%20-%20%2Fetc%2Flocaltime%3A%2Fetc%2Flocaltime%3Aro%20%20%0A%20%20%20%20%20%20-%20%2Frun%2Fdbus%3A%2Frun%2Fdbus%3Aro%20%20%0A%20%20%20%20environment%3A%20%20%0A%20%20%20%20%20%20-%20TZ%3DAmerica%2FChicago%20%20%0A%20%20%20%20ports%3A%20%20%0A%20%20%20%20%20%20-%208123%3A8123%20%20%0A%20%20%20%20restart%3A%20unless-stopped%20%20%0A%20%20%20%20privileged%3A%20true%20%20%60%0A%20%20%20%20network_mode%3A%20host%0A%60%60%60%60%0A%0AIn%20my%20example%20I%20am%20setting%20up%20homeassitant%2C%20a%20smart%20home%20service%20that%20manages%20your%20IoT%20devices.%0A%0A**container_name**%E2%80%8A%E2%80%94%E2%80%8Athe%20name%20of%20the%20container%20for%20reference%2C%20can%20be%20changed.%0A%0A**image**%E2%80%8A%E2%80%94%E2%80%8Athe%20url%20to%20the%20docker%20image%0A%0A**volumes**%E2%80%8A%E2%80%94%E2%80%8AMappings%20of%20the%20docker%20internal%20file%20system%20to%20your%20host%E2%80%99s%20file%20system.%20%60hostpath%3Ainternalpath%60i.e%20the%20first%20entry%20above%20would%20be%20mapping%20%60%2Fconfig%60%20folder%20from%20inside%20the%20docker%20container%20to%20%60%2Fhome%2F%3Cusername%3E%2F.homeassistant%60%0A%0A**environment**%E2%80%8A%E2%80%94%E2%80%8Awhere%20you%20setup%20your%20Environment%20Variables.%20For%20HA%20we%20set%20TZ%20to%20my%20timezone.%0A%0A**ports**%E2%80%8A%E2%80%94%E2%80%8AMaps%20internal%20Docker%20ports%20to%20host%20ports.%20%60hostport%3Ainternalport%60%20In%20our%20example%20it%E2%80%99s%20mapping%208123%20on%20both%20sides%20but%20if%20it%20conflicted%20I%20could%20change%20it%20on%20the%20host%20side%20like%20%608080%3A8123%60%20and%20be%20able%20to%20access%20at%20%60localhost%3A8080%60%0A%0A**restart%3A%20unless-stopped**%E2%80%8A%E2%80%94%E2%80%8AKeep%20service%20running%20even%20after%20restart%20of%20machine.%0A%0A**privileged%E2%80%8A%E2%80%94**%E2%80%8ARun%20service%20with%20sudo%0A%0A**network_mode%3A%20host%E2%80%8A%E2%80%94**%E2%80%8AUse%20the%20host%20system%E2%80%99s%20network.%0A%0A%23%23%23%23%20Running%20Docker%C2%A0Service%0A%0A%60%60%60%0A%24%20sudo%20docker%20compose%20up%20-d%20%0A%60%60%60%0A%0ARunning%20this%20in%20the%20directory%20you%20created%20the%20docker-compose.yml%20file%20will%20pull%20the%20docker%20image%20and%20run%20the%20container%20detatched%20%60-d%60%20in%20the%20background.%0A%0AConfirm%20your%20service%20is%20running%20with%20this%20command.%0A%0A%60%60%60%0A%24%20sudo%20docker%20ps%0A%60%60%60%0A%0AYou%20should%20be%20able%20to%20see%20your%20service%20also%20locally%3A%20%60http%3A%2F%2Flocalhost%3A8123%60%20(%20your%20port%20may%20differ).%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*6RLqMvwejr9mgEptSCQRYg.jpeg)%0A%0A%23%23%23%20Connect%20Externally%20with%20Cloudflare%20Tunnels%0A%0ANow%20that%20you%20have%20your%20Docker%20service%20running%20locally%2C%20you%20might%20want%20to%20access%20it%20from%20outside%20your%20local%20network%2C%20or%20let%20others%20connect%20to%20it%20if%20it%E2%80%99s%20a%20public%20facing%20website.%0A%0ANormally%2C%20you%20would%20point%20your%20Domain%20A%20record%20to%20your%20network%E2%80%99s%20public%20IPv4%20address%2C%20and%20then%20port%20forward%20port%2080%2F443%20on%20your%20router%20to%20your%20service%2C%20or%20reverse%20proxy.%20This%20is%20dangerous%20because%20it%20exposes%20your%20public%20IP%20address%20and%20gives%20hackers%20a%20direct%20connection%20into%20your%20home%20network%20which%20may%20be%20vulnerable%20if%20not%20secured%20correctly.%0A%0A%23%23%23%23%20Cloudflare%20Tunnels%0A%0AThis%20is%20where%20Cloudflare%20tunnels%20come%20in%20handy.%20Cloudflare%20essentially%20acts%20like%20a%20VPN%2C%20except%20in%20this%20case%20clients%20connecting%20to%20your%20service%20would%20first%20connect%20to%20Cloudflare%E2%80%99s%20IP%20which%20then%20communicates%20to%20your%20network%20and%20back%20to%20the%20client%2C%20masking%20your%20IP%20address.%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F0*cIaN-8DGlt8sR7Ic.jpg)%0A%0Acloudflare%20tunnel%C2%A0diagram%0A%0A%23%23%23%23%20Setting%20up%20Cloudflare%20Tunnel%0A%0A1.%20%5BCreate%20a%20FREE%20Cloudflare%20account%5D(https%3A%2F%2Fdash.cloudflare.com%2Fsign-up)%0A2.%20%5BMove%20Domain%20to%20Cloudflare%5D(https%3A%2F%2Fdevelopers.cloudflare.com%2Ffundamentals%2Fsetup%2Fmanage-domains%2Fadd-site%2F)%0A%0A-%20Unfortunately%2C%20to%20make%20this%20much%20easier%20you%20have%20to%20buy%20your%20domain%20through%20Cloudflare%20or%20transfer%20your%20domain%20to%20Cloudflare.%20I%20got%20my%C2%A0%60.com%60%20domain%20for%20around%20%249%20USD.%0A%0A3.%20%5BCreate%20a%20Cloudflare%20Tunnel%5D(https%3A%2F%2Fdevelopers.cloudflare.com%2Fcloudflare-one%2Fconnections%2Fconnect-networks%2Fget-started%2Fcreate-remote-tunnel%2F)%0A%0A-%20For%20my%20home%20assistant%20service%2C%20I%20chose%20to%20add%20it%20to%20a%20subdomain%20of%20my%20domain%3A%20%60home.mydomain.com%60%20so%2C%20that%20I%20can%20add%20more%20services%20on%20other%20subdomains%20without%20purchasing%20more%20domains.%0A%0A4.%20Run%20Cloudflare%20Tunnel%20Connector%20on%20your%20server%0A%0A-%20This%20is%20how%20Cloudflare%20talks%20to%20your%20server.%20The%20command%20is%20given%20to%20you%20when%20you%20create%20a%20Cloudflare%20Tunnel%2C%20just%20remember%20to%20chose%20the%20correct%20OS.%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F0*TWdu05LnrUMzP0lY.png)%0A%0AI%20copied%20the%20command%20to%20a%20file%20%60cloudflared.sh%60%C2%A0%2C%20and%20gave%20it%20execute%20permissions%20%60sudo%20chmod%20%2Bx%20cloudflared.sh%60%C2%A0%2C%20so%20I%20could%20easily%20start%20it%20again.%0A%0A%23%23%23%23%20Configure%20Tunnel%20to%20Point%20to%20Local%C2%A0Service%0A%0A1.%20Go%20to%20%60Cloudflare%20%3E%20Zero%20Trust%20%3E%20Networks%20%3E%20Tunnels%20%3E%20Your%20Tunnel%60%0A2.%20Click%20%60Edit%60%20button%20for%20your%20tunnel%2C%20go%20to%20%60Public%20Hostname%60%20tab%20next%20to%20Overview%0A3.%20Click%20%60Add%20a%20public%20hostname%60%20and%20add%20your%20subdomain%20(optional)%20and%20your%20domain.%20Add%20your%20local%20server%20IP%20address%20and%20port%20via%20HTTP.%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*clBFG4vzrxFUZeYkAR-K5g.png)%0A%0A%23%23%23%20Success!%0A%0AYou%20should%20be%20able%20to%20see%20your%20service%20available%20on%20your%20domain!%20For%20me%20that%20was%20%60https%3A%2F%2Fhome.mydomain.com%60%C2%A0.%0A%0ANotice%20that%20Cloudflare%20automatically%20creates%20an%20SSL%20certificate%20for%20you%20and%20serves%20your%20site%20over%20HTTPS%2C%20even%20though%20your%20local%20instance%20is%20running%20on%20HTTP%E2%80%A6%20MAGIC!%0A%0A%23%23%23%23%20Troubleshooting%0A%0AIf%20you%20get%20a%20502%20Bad%20Request%20page%20from%20Cloudflare%2C%20then%20Cloudflare%20is%20not%20able%20to%20find%20your%20service.%20Check%20to%20make%20sure%20your%20service%20and%20the%20cloudflared%20tunnel%20connector%20is%20running%20with%20%60sudo%20docker%20ps%60%C2%A0.%0A%0A!%5B%5D(https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F0*bKa4krf_TI1o4G-e.png)%0A%0AIf%20you%20get%20a%20different%20error%20like%20**400%20Bad%20Request**%20without%20a%20Cloudflare%20message%2C%20then%20you%20might%20be%20connecting%20successfully%20but%20the%20service%20is%20throwing%20the%20error.%0A%0A%23%23%23%23%20Side%20Note%3A%20Fixing%20Home%20Assistant%20400%20Bad%C2%A0Request%0A%0AIn%20my%20case%20with%20home%20assistant%2C%20I%20was%20getting%20a%20400%20error%20because%20I%20needed%20to%20configure%20Home%20Assistant%20to%20allow%20the%20connection.%0A%0A%60%60%60%0Ahttp%3A%20%20%0A%20%20use_x_forwarded_for%3A%20true%20%20%0A%20%20trusted_proxies%3A%20%20%0A%20%20%20%20-%20172.1.1.12%20%23%20cloudflare%20tunnel%20ip%0A%60%60%60%0AIn%20case%20someone%20else%20had%20same%20issue%2C%20put%20that%20in%20your%20HA%20configuration.yaml.%20I%20found%20the%20IP%20address%20by%20looking%20at%20Home%20Assistant%20logs%20and%20finding%20the%20400%20Bad%20Request%20logs%20and%20added%20the%20IP%20address%20from%20the%20log%20to%20the%20the%20config%20above.`,
    articleDescription: 'Easy self hosting with Cloudflare tunnels and Docker containers',
    imageSrc: '/images/SelfHostingArticleImage.png',
    createdDate: new Date('2024-05-14')
  }
];

export default Articles;


