import { useEffect, useState } from "react"
import type { Level } from "../../types/Level";
import type { ApiError } from "../../types/Error";
import { toast } from "react-toastify";
import { getAllLevels } from "../../services/level";

function AdminLevel() {
    const [loading,setLoading]=useState(false);
    const [levels,setLevels]=useState<Level[]>([]);
  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);

        const response = await getAllLevels();

        if (response.data.success) {
          setLevels(response.data.levels);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(
          err.data?.message || "Failed to fetch fields"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);


  return (
    <div>AdminLevel</div>
  )
}

export default AdminLevel