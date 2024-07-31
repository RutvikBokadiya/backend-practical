import "dotenv/config";
import db from "./Connection/index";
import app from "./Connection/routes";
(() => {
  try {
    require("./utils/swagger");

    // Listen to port 3001
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, async () => {
      // sequelize sync
      await db.sequelize.sync({ alter: true });
      console.log(`Server is Running on ${PORT} 🚀`);
    });
  } catch (error) {
    console.log("Error While Initialize server ", error);
  }
})();
