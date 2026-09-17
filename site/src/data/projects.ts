// Drawn from the 2026 CV — research work and named open-source projects,
// newest first. These replace the Azure blog topics that were standing in
// here before; those are posts, and they live on the Writing page.
//
// NOTE ON IMAGERY: every entry is text-only right now. The previous thumbnails
// were abstract ffmpeg patterns with no relationship to the work, which is
// worse than no image. Add a real figure or screen capture per entry — a
// gaze-tracking frame, a confusion matrix, a UR10 in Unity — and it appears
// automatically.
//
// `video` is optional and should be MP4/WebM, never GIF: the same loop is
// roughly 10-20x smaller as H.264, and GIF's 256-colour ceiling wrecks screen
// recordings.
//   ffmpeg -i capture.mov -vf "fps=24,scale=600:-2" -c:v libx264 \
//          -pix_fmt yuv420p -crf 30 -movflags +faststart public/media/name.mp4
//   ffmpeg -i public/media/name.mp4 -vframes 1 -q:v 4 public/media/name.jpg

export interface Project {
  title: string;
  href?: string;
  /** Institution, collaborators, stack — the citation-style second line. */
  meta?: string;
  desc?: string;
  year?: string;
  poster?: string;
  video?: string;
  /** Schematic id from ProjectDiagram, used until a real capture exists. */
  diagram?: string;
  badge?: string;
  external?: boolean;
}

export const projects: Project[] = [
  {
    title: 'EEG Biometric Identification',
    meta: 'Lymbic AI · CNNs · Muse2 · MLOps',
    year: '2022–',
    desc:
      'Novel convolutional networks that identify a subject from resting-state EEG, as the basis for a privacy-preserving biometric. Includes the training pipeline behind it: feature extraction, preprocessing, deployment and edge compute.',
    // A capture takes precedence over the schematic. NOTE: this clip is
    // DeepFaceLive doing *facial* landmark tracking, not EEG — see the
    // caveat raised when it was added.
    poster: '/media/eeg-biometric.jpg',
    video: '/media/eeg-biometric.mp4',
  },
  {
    title: 'Enhanced VR & BMI Robot',
    meta: 'Imperial College London · Brain and Behavior Lab · Prof. Aldo Faisal',
    year: '2021',
    desc:
      'MRes thesis. Gaze tracking drives a virtual UR10 robot in Unity: decoded eye-fixation classifications are paired with machine learning and an action grammar to address the Midas touch problem in gaze selection.',
    diagram: 'gaze-robot',
  },
  {
    title: 'EEG Brain State Decoding',
    meta: 'UC Berkeley · reproduction study · dCNNs',
    year: '2019',
    desc:
      'A reproduction of Tayeb et al. on classifying motor imagery from EEG. Read through memory-equivalent capacity, the shallow results do not reproduce, and the deep models’ accuracy turns out to come from a flawed pairing of sliding-window preprocessing with 5-fold cross validation.',
    diagram: 'eeg-decode',
  },
  {
    title: 'Project Bedrock',
    href: 'https://github.com/microsoft/bedrock',
    external: true,
    meta: 'Microsoft · Terraform · Kubernetes · open source',
    year: '2019',
    desc:
      'Open-source infrastructure orchestration for Kubernetes clusters, built around a GitOps workflow.',
    diagram: 'gitops-k8s',
  },
  {
    title: 'Humanoid Predictive Rewards',
    // Links to the VVV2013 summer school video rather than the 2014 school
    // page — VVV13 is the year of the residency.
    href: 'https://vimeo.com/70390713',
    external: true,
    // Still: Nathaniel's own photograph from the residency. Hover: 0:40.8-0:45
    // of the VVV2013 summer school video by Yoichi Matsuyama, which the entry
    // links to. The in-point skips the shot of attendees at 0:40-0:40.75, and
    // the out-point is fixed because 0:47 jumps to unrelated footage. The
    // photo-only loop is kept at public/media/icub-photos.mp4.
    poster: '/media/icub.jpg',
    video: '/media/icub.mp4',
    meta: 'Italian Institute of Technology · iCub · VVV2013 · C++',
    year: '2013',
    desc:
      'Summer residency in the robotics group: an algorithm in C++ used to study predictive reward behaviour in a humanoid platform, alongside work on motor control and tactile servoing.',
  },
];
