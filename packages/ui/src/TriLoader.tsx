import CenterOverlay from "./CenterOverlay";
import "./triLoader.css";

export default function TriLoader() {
  return <CenterOverlay>
    <div className="loader triangle z-10">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
  </CenterOverlay>
}