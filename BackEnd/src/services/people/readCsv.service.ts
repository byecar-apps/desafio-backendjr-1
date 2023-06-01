import { AppError } from "../../errors";
import fs from "fs";
import csv from "csv-parser";
import { peopleRepo } from "../../repositories";

const readCsvService = async (file) => {
  const results = [];

  if (file.mimetype !== "text/csv") {
    throw new AppError("the uploaded file must be a valid csv", 409);
  }
  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      results.forEach(async (el) => {
        const people = peopleRepo.create(el);

        await peopleRepo.save(people);
      });
    });
};

export default readCsvService;
