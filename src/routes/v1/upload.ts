import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log("hello");
  res.send("Helloo");
});

// router.get("/upload-image", async (req, res) => {
//   console.log(req);
//   res.send("hello");
// });
//TODO : add middleware to authenticate customer.
router.post("/upload-image", (req: Request, res: Response) => {
  try {
    console.log(req.files);
    console.log(req.body);
    console.log("Here");
    res.send("Hello");
  } catch (err) {
    console.log(err);
  }
});

export default router;
