import { useEffect, useState } from "react";
import { getFields } from "../../services/field";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
type Field = {
  id: string;
  fieldName: string;
  description: string;
};

function Home() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchFields = async () => {
    try {
      setLoading(true);
      const result = await getFields();
      if (result.data.success) {
        setFields(result.data.fields);
      }
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || "failed to fetch details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFields();
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        fields.map((field) => (
          <div
            key={field.id}
            onClick={() => navigate(`/fields/${field.id}`)}
            style={{ cursor: "pointer" }}
          >
            <p>{field.fieldName}</p>
            <p>{field.description}</p>
          </div>
        ))
      )}
    </>
  );
}

export default Home;
