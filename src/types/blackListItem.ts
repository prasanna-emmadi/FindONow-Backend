import { z } from "zod";

import { blackListSchema } from "../schemas/blackListSchema";

// to get the type FROM the ZOD validation
type BlackListItemDTO = z.infer<typeof blackListSchema>;

// we are adding an ID because, when we validate the data we don't care about the id. why?? because IDs are handled by the database
export type BlackListItem = BlackListItemDTO;
