import { useEffect, useState } from "react";
import { getFields } from "../services/field";
type Field={
    id:string,
    fieldName:string,
    description:string
}

function Home() {
  const [fields, setFields] = useState<Field[]>([]);
  const fetchFields = async () => {
    try {
      const result = await getFields();
      console.log("this is the result",result.data.fields);
      setFields(result.data.fields);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFields();
  }, []);
  return (
    <>
     {fields?.map((field)=>(
        <div>
            <p key={field.id}>{field.fieldName}</p>
            <p>{field.description}</p>
        </div>
     ))}
    </>
  );
}

export default Home;
