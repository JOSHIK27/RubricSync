import thesis from "../../public/Thesis-bro.svg";
import Image from "next/image";
import { Card } from "./ui/card";
export default function Features() {
  return (
    <section className="mb-20">
      <div className="flex justify-center flex-wrap mb-20">
        <Image src={thesis} width={500} height={500} alt="loading"></Image>
        <div className="w-[500px]">
          <div className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" stroke-linecap="round">
                <g stroke-dasharray="10" stroke-dashoffset="10">
                  <circle cx="5" cy="5" r="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.2s"
                      values="10;0"
                    />
                  </circle>
                  <circle cx="5" cy="12" r="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.2s"
                      values="10;0"
                    />
                  </circle>
                  <circle cx="5" cy="19" r="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.4s"
                      dur="0.2s"
                      values="10;0"
                    />
                  </circle>
                </g>
                <g stroke-dasharray="28" stroke-dashoffset="28">
                  <rect width="11" height="3" x="9.5" y="3.5" rx="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.1s"
                      dur="0.5s"
                      values="28;0"
                    />
                  </rect>
                  <rect width="11" height="3" x="9.5" y="10.5" rx="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.8s"
                      dur="0.5s"
                      values="28;0"
                    />
                  </rect>
                  <rect width="11" height="3" x="9.5" y="17.5" rx="1.5">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="1.5s"
                      dur="0.5s"
                      values="28;0"
                    />
                  </rect>
                </g>
              </g>
            </svg>
            <h1 className="text-left text-[36px] text-[#484642] font-[900]">
              Why ?
            </h1>
          </div>
          <p className="text-[#484642] p-4 text-[16px]">
            One big problem that every Masters/PhD student while submitting
            their thesis/report is, comparing it with long and overwhelming. How
            cool it would be to automate this process by using an AI powered
            application that syncs your rubric and report to provide
            comprehensive feedback.
          </p>
        </div>
      </div>
      <div className="flex justify-evenly flex-wrap">
        <Card className="m-4 shadow-md w-60 h-20">
          <div className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 256 256"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              >
                <path d="m 127.99999,239.96468 c 0,0 95.98506,-31.99503 95.98506,-111.98257" />
                <path d="M 223.98505,127.98211 V 31.997059 c 0,0 -31.99502,-15.997511 -95.98506,-15.997511" />
                <path d="m 128,239.96468 c 0,0 -95.985056,-31.99503 -95.985056,-111.98257" />
                <path d="M 32.014944,127.98211 V 31.997059 c 0,0 31.995019,-15.997509 95.985056,-15.997509" />
                <path d="M 191.99003,63.99208 C 128,111.9846 112.00249,175.97464 112.00249,175.97464 c 0,0 -15.997511,-19.0946 -31.995019,-31.99502" />
              </g>
            </svg>
            <h1 className="text-[#484642] text-[16px] font-[600]">
              Open Source
            </h1>
          </div>
        </Card>
        <Card className="m-4 shadow-md w-60 h-20">
          <div className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm4-8h8v-2H6zm0-3h12V9H6zm0-3h12V6H6z"
              />
            </svg>
            <h1 className="text-[#484642] text-[16px] font-[600]">
              Chat with pdf
            </h1>
          </div>
        </Card>
        <Card className="m-4 shadow-md w-60 h-20">
          <div className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
              />
            </svg>
            <h1 className="text-[#484642] text-[16px] font-[600]">
              Download the report
            </h1>
          </div>
        </Card>
        <Card className="m-4 shadow-md w-60 h-20">
          <div className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22.363 1.636H1.635C.732 1.636 0 2.37.001 3.273L0 20.727v.003c0 .903.733 1.634 1.635 1.634h20.73c.904 0 1.635-.734 1.635-1.637V3.273c.016-.89-.76-1.64-1.637-1.637M3.979 2.886c.492-.507 1.279.28.77.772c-.491.508-1.278-.279-.77-.771zM1.8 2.89c.507-.509 1.28.265.772.771c-.493.502-1.274-.28-.772-.771m21.7 17.838c.012.611-.524 1.148-1.137 1.136H1.635A1.137 1.137 0 0 1 .5 20.727L.501 4.91H23.5zM11 16.159l5.946-4.577c.235-.2.576.129.389.372l-.002-.002l-3.936 6.35a1.638 1.638 0 0 1-2.448.405c-.785-.668-.811-1.835.05-2.548zm4.763-.75c.09-.168 2.002-3.181 2.06-3.35c2.056 1.813 3.029 4.382 2.898 7.026h-3.819c.073-1.39-.29-2.678-1.139-3.676m-8.679 3.682H3.278c-.357-7.022 7.148-11.735 13.39-7.92l-3.461 2.618c-3.3-.762-6.364 1.71-6.123 5.302"
              />
            </svg>
            <h1 className="text-[#484642] text-[16px] font-[600]">
              Comphrensive Feedback
            </h1>
          </div>
        </Card>
      </div>
    </section>
  );
}
