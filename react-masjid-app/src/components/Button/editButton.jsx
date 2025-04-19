import { Link } from "react-router-dom";
import edit from "../../images/icons8-edit-48.png";
import Button from "react-bootstrap/Button";
export default function EditButton({ to = "/" }) {
  return (
    <>
      <Link to={to}>
        <Button variant="warning">
          Edit <img src={edit} alt="" style={{ width: "30px" }} />
        </Button>
      </Link>
    </>
  );
}
