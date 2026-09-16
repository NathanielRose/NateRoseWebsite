// Scaffolding derived from the topics Nate has actually shipped and written
// about. Edit freely — this file is the whole projects page.
//
// `video` is optional. Author clips as MP4 (or WebM), never GIF: the same
// two-second loop is roughly 10-20x smaller as H.264 than as an animated GIF,
// and GIF's 256-colour ceiling wrecks screen recordings.
//   ffmpeg -i capture.mov -vf "fps=24,scale=600:-2" -c:v libx264 \
//          -pix_fmt yuv420p -crf 30 -movflags +faststart public/media/name.mp4

export interface Project {
  title: string;
  href: string;
  meta?: string;
  desc?: string;
  poster?: string;
  video?: string;
  badge?: string;
  external?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Monte Carlo Simulator on Azure Service Fabric',
    href: '/guest-container-azure-service-fabric/',
    meta: 'ASP.NET · Service Fabric · guest containers',
    desc: 'Converting a monolithic simulation app into containerised microservices running on a Service Fabric cluster.',
    poster: '/media/mandelbrot.jpg',
    video: '/media/mandelbrot.mp4',
  },
  {
    title: 'RabbitMQ on Kubernetes with Helm',
    href: '/rabbitmq-acs-kubernetes-helm/',
    meta: 'Kubernetes · Helm · Azure Container Service',
    desc: 'Deploying a message-broker workload into a Kubernetes-orchestrated ACS cluster with templated Helm charts.',
    poster: '/media/life.jpg',
    video: '/media/life.mp4',
  },
  {
    title: 'Java App Service CI/CD with Maven',
    href: '/java-app-service-maven/',
    meta: 'Java · Maven · VSTS pipelines',
    desc: 'A build-and-release pipeline pushing Java web apps to Azure App Services on every commit.',
    poster: '/media/gradients.jpg',
    video: '/media/gradients.mp4',
  },
  {
    title: 'Social Media Integration with Logic Apps',
    href: '/using-logic-apps-for-connecting-social-media/',
    meta: 'Logic Apps · Azure Functions',
    desc: 'Event-driven connectors wiring social platforms into a continuous deployment flow.',
    poster: '/media/plasma.jpg',
    video: '/media/plasma.mp4',
  },
];
