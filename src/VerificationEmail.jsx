import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import {verifyEmail} from "./apicalls"

export default function VerificationEmail() {
    const { verifToken } = useParams();
  const [verification, setVerification] = useState({});
  console.log(verifToken)

  useEffect(() => {
    //Authenticate our cookie sir
    (async function () {
      const res = await verifyEmail({
        verifToken,
      });
      setVerification(res);
    })();
  }, []);

    return (
        <div>
            <h2>user is verified {verification.verified}</h2>
        </div>
    )
}
