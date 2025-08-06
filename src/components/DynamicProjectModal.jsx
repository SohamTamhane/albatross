import BrandingModal from "./BrandingModal";
import AdsModal from "./AdsModal";
import SocialMediaModal from "./SocialMediaModal";
import DefaultModal from "./ProductModalShow"; 

export default function DynamicProjectModal({ project, onClose }) {
  switch (project.category) {
    case "Branding":
      return <BrandingModal project={project} onClose={onClose} />;
    case "Advertisement":
      return <AdsModal project={project} onClose={onClose} />;
    case "Social Media":
      return <SocialMediaModal project={project} onClose={onClose} />;
    default:
      return <DefaultModal project={project} onClose={onClose} />;
  }
}
