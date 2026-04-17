import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function V2Page() {
  return (
    <main className={`${poppins.variable} min-h-screen bg-[#111419]`}>
      <header className="fixed inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 w-full max-w-[1460px] items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
          <Link href="/V2" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111318]/55 ring-1 ring-[#FF6B00]/20 backdrop-blur-sm">
              <Image
                src="/logo-old.png"
                alt="Axtora Labs"
                width={52}
                height={52}
                className="h-auto w-8"
              />
            </div>
            <div className="flex flex-col leading-none text-white">
              <span className="text-lg font-semibold tracking-[-0.035em] sm:text-[1.2rem]">
                Axtora Labs
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#FF6B00]">
                Intelligent Agents
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="https://x.com/axtoralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FFB27A] transition-colors hover:text-[#FF6B00]"
            >
              Follow @axtoralabs
            </Link>
          </nav>
        </div>
      </header>

      <section
        className="relative min-h-screen overflow-hidden"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/empty-banner.jpg"
            alt="Axtora Labs hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] lg:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,14,0.52)_0%,rgba(10,12,16,0.24)_28%,rgba(12,15,20,0.08)_56%,rgba(15,18,23,0.16)_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute left-[-12%] top-[18%] h-[380px] w-[380px] rounded-full bg-[#FF6B00]/9 blur-[150px]" />
          <div className="absolute right-[8%] top-[16%] h-[220px] w-[220px] rounded-full bg-[#FF6B00]/7 blur-[120px]" />
        </div>
        <div className="absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(90deg,rgba(10,12,16,0.46)_0%,rgba(10,12,16,0.12)_58%,transparent_100%)] lg:w-[34%]" />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1460px] px-5 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex min-h-screen flex-col justify-between py-12 lg:py-0">
            <div className="hidden lg:block lg:h-[15vh] xl:h-[16vh]" />

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(450px,560px)] xl:grid-cols-[minmax(0,1fr)_600px]">
              <div className="flex min-h-[42vh] items-start text-center sm:text-left lg:min-h-[32vh]">
                <div className="max-w-[36rem]">
                  <p className="text-[1.12rem] font-normal leading-[1.46] tracking-[-0.028em] text-white/92 sm:text-[1.42rem] md:text-[1.82rem] md:leading-[1.48]">
                    Context-aware voice AI built for branded agents, patented orchestration, and real-world deployment.
                  </p>
                  <p className="mt-7 max-w-[31rem] text-[11px] font-medium uppercase tracking-[0.28em] text-[#FFB27A] sm:text-xs md:text-[0.88rem]">
                    Now Tokenized with $AXTORA on Virtuals Protocol
                  </p>

                  <div className="mt-7 flex justify-center sm:justify-start">
                    <Link
                      href="#iao"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#FF6B00] px-8 py-4 text-base font-semibold text-[#1C1C22] shadow-[0_16px_50px_rgba(255,107,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7a14] hover:shadow-[0_20px_60px_rgba(255,107,0,0.34)] sm:text-lg"
                    >
                      Participate in IAO
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center pt-3 text-center lg:items-end lg:text-right">
                <Image
                  src="/just-text.png"
                  alt="Axtora Labs intelligent agent orchestration"
                  width={960}
                  height={314}
                  priority
                  className="h-auto w-full max-w-[430px] lg:max-w-[500px] xl:max-w-[560px]"
                />

                <div className="mt-6 w-full max-w-[660px] border-t border-white/10 pt-5">
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-left lg:flex-nowrap lg:justify-end xl:gap-x-7">
                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-white/62">
                      <Shield className="h-5 w-5 text-[#FF6B00]" />
                      <span>Patented AI (HK30101316)</span>
                    </div>
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-white/62">
                      <Zap className="h-5 w-5 text-[#FF6B00]" />
                      <span>Virtuals Protocol IAO</span>
                    </div>
                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-white/62">
                      <Globe className="h-5 w-5 text-[#FF6B00]" />
                      <span>Global Patent Portfolio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:h-[16vh] xl:h-[17vh]" />
          </div>
        </div>
      </section>

      <footer className="relative z-20 border-t border-white/10 bg-[#111419]">
        <div className="mx-auto flex w-full max-w-[1460px] flex-col gap-3 px-5 py-5 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 xl:px-10 lg:text-left">
          <div>
            <p className="text-sm font-medium tracking-[-0.02em] text-white/82">
              Axtora Labs
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#FFB27A]/80">
              Context-aware conversational AI, tokenized for the future.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center lg:justify-end">
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              Patent No. HK30101316
            </span>
            <Link
              href="https://x.com/axtoralabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FFB27A] transition-colors hover:text-[#FF6B00]"
            >
              @axtoralabs
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
