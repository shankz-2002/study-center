// import { useEffect, useState } from "react";
// import type { Topic } from "../../types/Topic";
// import { getTopics } from "../../services/topic";
// import { toast } from "react-toastify";
// import type { ApiError } from "../../types/Error";

// function AdminTopic() {
//   const [loading, setLoading] = useState(false);
//   const [topics, setTopics] = useState<Topic[]>([]);
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         setLoading(true);
//         const response = await getTopics();
//         if (response?.data?.success) {
//           setTopics(response.data.topics);
//         }
//       } catch (error) {
//         const err = error as ApiError;

//         toast.error(err.data?.message || "Failed to fetch categories");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTopics();
//   });

//   return <div>AdminTopic</div>;
// }

// export default AdminTopic;
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";

import type { Topic } from "../../types/Topic";
import type { ApiError } from "../../types/Error";

import { getTopics } from "../../services/topic";

function AdminTopic() {
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);

        const response = await getTopics();

        if (response?.data?.success) {
          setTopics(response.data.topics);
        }
      } catch (error) {
        const err = error as ApiError;

        toast.error(err.data?.message || "Failed to fetch topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Topics
      </Typography>

      {topics.length === 0 ? (
        <Typography color="text.secondary">No topics found.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: 2,
          }}
        >
          {topics.map((topic) => (
            <Card key={topic.id}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {topic.topicName}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {topic.description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                  <strong>Category:</strong>{" "}
                  {topic.category?.categoryName || "Not assigned"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Field:</strong>{" "}
                  {topic.category?.field?.fieldName || "Not assigned"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default AdminTopic;
