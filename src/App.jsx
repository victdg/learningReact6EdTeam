import "./App.css";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <p>Family</p>
      <BrowserRouter>
        <Navegation />
        <Routes>
          <Route path="/familyMembers" element=<FamilyMembersLayout />>
            <Route index element=<FamilyMembers /> />
            <Route path=":userId" element=<FamilyMember name={123} /> />
          </Route>
          <Route path="/" element=<Main /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function FamilyMembersLayout() {
  return <Outlet namez={456} />;
}

function FamilyMember(props) {
  const receivedData = useLocation();
  console.log(props);
  console.log("useLocation in family member::>>", receivedData);
  return (
    <>
      <p>FamilyMember: {receivedData.state.user}</p>
      {/* <p>State: {receivedData.state.}</p> */}
      <Link to="normal">normal</Link>
      <Link to="../prev">prev 1</Link>
      <Link to="../../prev">prev 2</Link>
      <Link to="path" relative="path">
        path
      </Link>
      <Link to="path" relative="route">
        route
      </Link>
    </>
  );
}

function FamilyMembers() {
  const storage = useRef({
    users: [
      { name: "vic", active: false },
      { name: "dani", active: false },
    ],
  });
  const [users, setUsers] = useState([]);
  const relativepath = useLocation().pathname;
  console.log("usersx::>>", users);
  useEffect(() => {
    console.log("useEffect called");
    setUsers(storage.current.users);
    return () => {
      console.log("Unmount component");
    };
  });
  console.log("useLocation in family members::>>", useLocation());
  return (
    <>
      <p>Family Members</p>
      {users.map((user) => {
        console.log("user::<>", user);
        return (
          <Fragment key={user.name}>
            <Link
              to={`${relativepath}/${user.name}`}
              state={{ user: user.name }}
            >
              {user.name}
            </Link>
            <br />
          </Fragment>
        );
      })}
    </>
  );
}

function Main() {
  return <p>Main route</p>;
}

function Navegation() {
  return (
    <>
      <Link to="/">Main page</Link>
      <br />
      <Link to="/familyMembers">Family Members</Link>
    </>
  );
}

export default App;
