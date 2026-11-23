const cvUrl = '/resume/Jericho_M_Flores_CV.pdf';

export default function DownloadCvLink({ className, onClick }) {
  return (
    <a className={className} href={cvUrl} download onClick={onClick}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4" />
      </svg>
      Download CV
    </a>
  );
}
