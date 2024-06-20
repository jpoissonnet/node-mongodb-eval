import { Hono } from "hono";
import { isValidObjectId } from "mongoose";
import { Flipper } from "../models/flippers";

const api = new Hono().basePath("/flippers");

api.get("/", async (c) => {
  const allFlippers = await Flipper.find(
    {},
    {},
    {
      populate: "brands",
    },
  );

  return c.json(allFlippers);
});

api.get("/:id", async (c) => {
  const _id = c.req.param("id");

  if (isValidObjectId(_id)) {
    const oneLipper = await Flipper.findOne({ _id });
    return c.json(oneLipper);
  }

  return c.json({ msg: "ObjectId malformed" }, 400);
});

api.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const newFlipper = new Flipper(body);
    const saveFlipper = await newFlipper.save();
    return c.json(saveFlipper, 201);
  } catch (error: any) {
    return c.json(error, 400);
  }
});

api.put("/:id", async (c) => {
  const _id = c.req.param("id");
  const body = await c.req.json();

  const q = {
    _id,
  };
  const updateQuery = {
    ...body,
  };

  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
    new: true,
  });
  return c.json(tryToUpdate, 200);
});

api.delete("/:id", async (c) => {
  const _id = c.req.param("id");

  const tryToDelete = await Flipper.deleteOne({ _id });
  const { deletedCount } = tryToDelete;

  if (deletedCount) {
    return c.json({ msg: "DELETE done" });
  }

  return c.json({ msg: "not found" }, 404);
});

api.patch("/:id/images", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const { url: newImageUrl } = body;
  const q = {
    _id: id,
  };
  const updateQuery = {
    $addToSet: {
      images: newImageUrl,
    },
  };
  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
    new: true,
  });
  return c.json(tryToUpdate);
});

api.delete("/:id/images", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const { url: imageUrlToDelete } = body;
  const q = {
    _id: id,
  };
  const updateQuery = {
    $pull: {
      images: imageUrlToDelete,
    },
  };
  const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, {
    new: true,
  });
  return c.json(tryToUpdate);
});

export default api;
