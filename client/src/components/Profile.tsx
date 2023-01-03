import { useAuthentication } from "../utils/hooks";
import NavBar from "./NavBar";

function Profile() {
  useAuthentication();

  return (
    <NavBar>
      <div>private</div>
    </NavBar>
  );
}

export default Profile;
