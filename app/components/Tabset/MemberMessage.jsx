//
import React from "react";

import * as S from "./styled";

function MemberMessage() {
  return (
    <S.TabPanel6>
      <div className="member-container">
        <h1
          // className="bold-msg"
          style={{ marginTop: "10px", fontSize: "20px", fontWeight: "bold" }}
        >
          Thank you for confirming this information
        </h1>
        {/* <p style={{ marginTop: "30px" }}>Your claim has been activated</p> */}
        <h1 className="bold-msg" style={{ marginTop: "30px" }}>
          Your claim will now be processed and your local 1-800-Dent-Doc service
          technician will be assigned shortly. Be on the lookout for
          communications with your technician info and how to proceed.
        </h1>
        <br />
        <h1 className="bold-msg">
          If you have any questions, please call our claims department at (714)
          633-8324 or email claims@1800dentdoc.com.
        </h1>
        <br />
        <h1 className="bold-msg">Claims Department Hours</h1>
        <h1 className="bold-msg">Monday - Friday</h1>
        <h1 className="bold-msg">6am - 3pm PST</h1>
      </div>
    </S.TabPanel6>
  );
}

MemberMessage.propTypes = {};

export default MemberMessage;
