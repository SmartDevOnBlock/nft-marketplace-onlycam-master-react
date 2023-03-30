import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({}));
export default function ShareSocialMedia({ url }) {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <label>
          <FacebookShareButton url={url} target="_blank">
            <SiFacebook />
          </FacebookShareButton>
        </label>
      </ListItem>
      <ListItem>
        <label>
          <TwitterShareButton
            url={url}
            title={`frontend`}
            hashtag="#camperstribe"
          >
            <FaTwitter />
          </TwitterShareButton>
        </label>
      </ListItem>

      <ListItem>
        <label>
          <TelegramShareButton
            url={url}
            title={"CampersTribe - World is yours to explore"}
          >
            <FaTelegramPlane />
          </TelegramShareButton>
        </label>
      </ListItem>
      <ListItem>
        <label>
          <EmailShareButton
            url={url}
            email="support@metaarts.io"
            subject="frontend"
            body="frontend frontend"
            className="Demo_some-network__share-button"
          >
            <GrMail />
          </EmailShareButton>
        </label>
      </ListItem>
    </List>
  );
}
