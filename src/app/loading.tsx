/* eslint-disable @next/next/no-img-element */
import { EternalLogoLoader } from "@/components/eternalLogo/EternalLogoLoader";
import LoaderText from "../../public/EternalLoaderText.png";
export default function Loading() {
  return (
    <div className="loader">
      <div className="container">
        <div className="loader-inner">
          <div className="loading-logo-container">
            <EternalLogoLoader />
          </div>
          <img className="loader-text" src={LoaderText.src} alt="loader text" />
        </div>
      </div>
    </div>
  );
}
