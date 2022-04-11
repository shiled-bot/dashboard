import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ServerPicker.scss";

const DefaultAvatar = ({ name, botInGuild, discord_id }) => {
  const text = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase());

  return botInGuild ? (
    <Link
      className="icon"
      to={"/dashboard/server/" + discord_id}
    >
      {text}
    </Link>
  ) : (
    <div className="icon">{text}</div>
  );
};

const ServerBlock = ({ guild }) => {
  return (
    <div
      className={
        "guild" +
        ((!guild.iconURL ? " no-icon" : "") +
          (!guild.botInGuild ? " not-ok" : ""))
      }
    >
      {guild.iconURL ? (
        guild.botInGuild ? (
          <Link to={"/dashboard/server/" + guild.discord_id}>
            <img src={guild.iconURL} alt={guild.name} />
          </Link>
        ) : (
          <div>
            <img src={guild.iconURL} alt={guild.name} />
          </div>
        )
      ) : (
        <DefaultAvatar name={guild.name} botInGuild={guild.botInGuild} discord_id={guild.discord_id}/>
      )}
      {guild.botInGuild ? (
        <span className="name">{guild.name}</span>
      ) : (
        <span className="name">
          {guild.name}
          <br />
          <Link to="/invite">Add</Link> shield to continue
        </span>
      )}
    </div>
  );
};

const LoadingHeading = () => {
  return (
    <div className="_loading">
      <span className="l-1 letter">F</span>
      <span className="l-2 letter">e</span>
      <span className="l-3 letter">t</span>
      <span className="l-4 letter">c</span>
      <span className="l-5 letter">h</span>
      <span className="l-6 letter">i</span>
      <span className="l-7 letter">n</span>
      <span className="l-8 letter">g</span>
      <span className="l-9 letter">.</span>
      <span className="l-10 letter">.</span>
      <span className="l-11 letter">.</span>
  </div>
  )
};

const ServerPicker = () => {
  const [guilds, setGuilds] = useState(null);
  const [updated, setUpdated] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/guilds", {
        headers: { "x-access-token": token },
      })
      .then(({ data: { guilds } }) => {
        if (!guilds) return;
        setGuilds(guilds);
      });
  }, []);

  const refreshGuildHandler = () => {
    setGuilds(null);
    setUpdated(false);
    axios
    .get(process.env.REACT_APP_API_URL + "/guilds?refetch=true", {
      headers: { "x-access-token": token },
    })
    .then(({ data: { guilds } }) => {
      if (!guilds) return;
      setUpdated(true);
      setGuilds(guilds);
    });
  };

  return (
    <main>
      <div className="server-picker">
        <div className="label">
          <i className="fas fa-list"></i>Server picker
        </div>
        <div className="guilds-container">
          {guilds ? (
            guilds.map((guild, i) => <ServerBlock guild={guild} key={i} />)
          ) : (
            <LoadingHeading />
          )}
        </div>
      </div>
      <div
        className={"refresh" + (!updated ? " loading" : "")}
        onClick={refreshGuildHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
        <span>Refresh</span>
      </div>
    </main>
  );
};

export default ServerPicker;
