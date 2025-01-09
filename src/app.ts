import 'dotenv/config'
import { Server } from "./presentation/server";

(() => {
    main();
})();

function main() {
    Server.start()
}