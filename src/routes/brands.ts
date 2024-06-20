import { Hono } from "hono";
import { Brand } from "../models/brands";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath("/brands");

api.get("/", async (c) => {
  const allBrands = await Brand.find({}, {}, {});

  return c.json(allBrands);
});

api.get("/:id", async (c) => {
  const _id = c.req.param("id");

  if (isValidObjectId(_id)) {
    const oneCrea = await Brand.findOne({ _id });
    return c.json(oneCrea);
  }

  return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const newBrand = new Brand(body);
    const saveBrand = await newBrand.save();
    return c.json(saveBrand, 201);
  } catch (error: any) {
    return c.json(error, 400);
  }
});

api.delete("/:id", async (c) => {
  const _id = c.req.param("id");

  const tryToDelete = await Brand.deleteOne({ _id });
  const { deletedCount } = tryToDelete;

  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }

  return c.json({ msg: "not found" }, 404);
});

export default api;
