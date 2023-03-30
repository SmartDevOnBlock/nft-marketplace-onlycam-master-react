import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    textAlign: "start",
    "& h1": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  details: {
    "& h4": {
      fontSize: "15px",
      lineHeight: "25px",
    },
    "& h3": {
      fontSize: "18px",
      lineHeight: "25px",
      color: "#fff",
    },
    "& h5": {
      color: "#fff",
      fontSize: "13px",
      paddingBottom: "5px",
      fontStyle: "italic",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
}));
export default function ArbitrationPolicy() {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} termParent`}>
      <Container>
        <Box className={classes.colorbox} mt={5}>
          <Box className={classes.heading}>
            <Typography variant="h1">Arbitration Policy:</Typography>
          </Box>
          <Box className={classes.details} mt={2}>
            <Typography variant="h4">
              This Policy governs how disputes shall be resolved that arise
              under the Terms of Service, or the use of our Platform, and the
              rights and obligations entailed by both parties. You should read
              this section carefully and be sure you understand and regularly
              review or re-read it to remain fully informed of any changes
              governing this agreement. This Policy is a constituent of our
              Terms, and incorporates its terminology.
              <br />
              <br />
              If the user is a citizen, or resident, of the United States, or
              any insular possession of the United States, the user agrees as
              follows:
              <br /> <br />
            </Typography>{" "}
            <br />
            <Container>
              <Typography variant="h4">
                <ul>
                  <li>
                    Claims Subject to Arbitration: Any controversy or claim
                    arising out of or relating to this contract, or the breach
                    thereof, shall be settled by arbitration administered by the
                    American Arbitration Association in accordance with its
                    Commercial Arbitration Rules and judgment on the award
                    rendered by the arbitrator(s) may be entered in any court
                    having jurisdiction thereof.
                  </li>
                  <li>
                    Number of Arbitrators: Claims shall be heard by a single
                    arbitrator.
                  </li>
                  <li>
                    Place of Arbitration: The place of arbitration shall be
                    Saint Vincent and the Grenadines.
                  </li>
                  <li>
                    Controlling Law: The arbitration shall be governed by the
                    laws of the Saint Vincent and the Grenadines.
                  </li>
                  <li>
                    Limits on Discovery: If the dispute is less than $100,000
                    there shall be no discovery other than the exchange of
                    documents. If the dispute is over $100,000, discovery shall
                    consist of no more than 1 deposition of 4 hours or less. In
                    making determinations regarding the scope of exchange of
                    electronic information, the arbitrator(s) and the parties
                    agree to be guided by The Sedona Principles, Third Edition:
                    Best Practices, Recommendations & Principles for Addressing
                    Electronic Document Production.
                  </li>
                  <li>
                    No Oral Argument: The arbitration will be based only on the
                    submission of documents and there shall be no in-person or
                    oral hearing.
                  </li>
                  <li>
                    Length of Proceeding: Time is of the essence for any
                    arbitration under this agreement and arbitration hearings
                    shall take place within 90 days of filing and awards
                    rendered within 120 days. Arbitrator(s) shall agree to these
                    limits prior to accepting appointment. The arbitrators will
                    have no authority to award punitive or other damages not
                    measured by the prevailing party's actual damages, except as
                    may be required by statute. The arbitrator(s) shall not
                    award consequential damages in any arbitration initiated
                    under this section.
                  </li>
                  <li>
                    Award Limited: Any award in an arbitration initiated under
                    this clause shall be limited to monetary damages and shall
                    include no injunction or direction to any party other than
                    the direction to pay a monetary amount.
                  </li>
                  <li>
                    Expenses: Each party shall bear its own costs and expenses
                    and an equal share of the arbitrators' and administrative
                    fees of arbitration. The award of the arbitrators shall be
                    accompanied by a reasoned opinion.
                  </li>
                  <li>
                    Confidential Proceeding: Except as may be required by law,
                    neither a party nor an arbitrator may disclose the
                    existence, content, or results of any arbitration hereunder
                    without the prior written consent of both parties.
                  </li>
                  <li>
                    Effect of Failure to Pay: The parties agree that failure or
                    refusal of a party to pay its required share of the deposits
                    for arbitrator compensation or administrative charges shall
                    constitute a waiver by that party to present evidence or
                    cross-examine witness. In such an event, the other party
                    shall be required to present evidence and legal argument as
                    the arbitrator(s) may require for the making of an award.
                    Such waiver shall not allow for a default judgment against
                    the non-paying party in the absence of evidence presented as
                    provided for above.
                  </li>
                </ul>
              </Typography>
            </Container>
            <br />
            <br />
            <Typography variant="h4">
              All users that are not citizens, or residents of the United
              Kingdom, hereby agree as follows:
              <Container>
                <ul>
                  <li>
                    Claims Subject to Arbitration: Any controversy or claim
                    arising out of or relating to this contract, or the breach
                    thereof, shall be determined by arbitration administered by
                    the Saint Vincent and the Grenadines Court of International
                    Arbitration in accordance with its International Arbitration
                    Rules.
                  </li>
                  <li>
                    Number of Arbitrators: All disputes shall be heard by a
                    single arbitrator.
                  </li>
                  <li>
                    Place of Arbitration:The place of arbitration shall be Saint
                    Vincent and the Grenadines.
                  </li>
                  <li>
                    Limits on Discovery: Consistent with the expedited nature of
                    arbitration, pre-hearing information exchange shall be
                    limited to the reasonable production of relevant
                    non-privileged documents explicitly referred to by a party
                    for the purpose of supporting relevant facts presented in
                    its' case, carried out expeditiously.
                  </li>
                  <li>
                    Confidential Proceeding: Except as may be required by law,
                    neither a party nor its representatives may disclose the
                    existence, content, or results of any arbitration hereunder
                    without the prior written consent of (all/both) parties.
                  </li>
                </ul>
              </Container>
            </Typography>{" "}
            <Typography variant="h4">
              Notwithstanding the above, we may provide additional guidance on
              our understanding, definition, and interpretation of this
              Arbitration Policy through other means and channels as we see fit,
              including in particular through official technical and customer
              support channels and published memoranda, in addition to
              modifications to this Policy and these Terms. We will endeavour to
              provide forthright and clear guidance on how best to use, and
              avoid the misuse of, our Service. If you have any questions or
              concerns about these Terms or the Arbitration Policy, please reach
              out to us at support@only.cam or through other official support
              channels.
            </Typography>{" "}
            <br />
            <Typography variant="h5">Last Updated: April 21, 2022</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
