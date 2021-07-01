const os = require("os");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
console.log("Hackeando tu sistema operativo...");
setTimeout(() => {
  switch (process.platform) {
    case "win32":
      console.log(chalk.green("Tú no molas mucho"));
      break;
    case "linux":
      console.log(chalk.green("Tú molas"));
      break;
    case "darwin":
      console.log(
        chalk.green(
          "Tú no molas nada. Bueno, excepto si eres Geraldine o Pol. En ese caso molas. Pero por ser tú, no por usar Mac"
        )
      );
      break;
    default:
      console.log(chalk.red("No sé que sistema operativo estás utilizando."));
      break;
  }
  let free_mem_in_kb = os.freemem() / 1024;
  let free_mem_in_mb = Math.floor(free_mem_in_kb / 1024);
  console.log(
    `Cuidado, te quedan ${chalk.green(free_mem_in_mb)} Mb de RAM libre`
  );
  console.log(
    `La versión de tu sistema operativo es ${chalk.green(os.version())}`
  );
  const { username: nombreUsuario, homedir: carpetaUsuario } = os.userInfo();
  console.log(
    `Tu usuario del sistema operativo es ${chalk.green(
      nombreUsuario
    )} y tu carpeta es ${chalk.green(carpetaUsuario)}`
  );
  console.log(`Éstos son los archivos y carpetas de tu carpeta de usuario:`);
  fs.readdir(__dirname, (err, archivos) => {
    if (err) {
      console.log(chalk.red(`Algo ha petado ${err.message}`));
      process.exit();
    }
    for (const archivo of archivos) {
      fs.stat(path.join(__dirname, archivo), (err, datos) => {
        if (err) {
          console.log(chalk.red(`Algo ha petado ${err.message}`));
          process.exit();
        }
        console.log(
          `${chalk.green(archivo)}${
            datos.size > 0 ? chalk.yellow(` ${datos.size}`) : ""
          }`
        );
      });
    }
  });
}, 2000);
