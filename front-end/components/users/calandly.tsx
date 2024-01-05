import { useEffect, useState } from "react";
import { Problem } from "../../types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import ProblemService from "../../services/ProblemService";

type Props = {
  problem: Problem;
};

const Calendly: React.FC<Props> = ({ problem }: Props) => {
    const router = useRouter();
    const userId = parseInt(router.query.userId as string);
    const deviceId = parseInt(router.query.deviceId as string)
    const problemId = parseInt(router.query.problemId as string)

  //   const [description, setDescription] = useState<string>()

  //   const problemDescription = async () => {
  //     ProblemService.getProblemById(problemId ,deviceId)
  //         .then((res) => res.json())
  //         .then((problem: Problem) => setDescription(problem.issue.description));
  // };
    

  useEffect(() => {
    // if (router.isReady) {
    //    problemDescription();
    // }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });
  // }, [router.isReady]);

  
  return (
    <>
        <h4 className="text-center m-0">Maak een afspraak</h4>

        

          <div
            className="calendly-inline-widget"
            data-url={`https://calendly.com/maakbaarleuvendemo/30min?primary_color=71b8c5&hide_event_type_details=1&hide_gdpr_banner=1&text_color=9c7a97&a1=probleem`}
            style={{ minWidth: '320px', height: '660px'}}
          ></div>  
        <Link
            href={`/users/${userId}/devices`}
            className="btn btn-outline-primary px-4 fs-6 w-100"
            >
            <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
        </Link>
               
      
    </>
  );
};

export default Calendly;