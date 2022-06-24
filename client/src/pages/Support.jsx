import LoadingActionScreen from "../components/LoadingScreens/LoadingActionScreen";

export default function Support() {
  // redirect
  window.location.href = process.env.REACT_APP_DISCORD_INVITE;

  return (
    <LoadingActionScreen title="Redirecting to Support Server"></LoadingActionScreen>
  )
}
