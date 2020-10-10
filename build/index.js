"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const rtRoute_1 = __importDefault(require("./routes/rtRoute"));
const database_1 = __importDefault(require("./database"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        database_1.default;
    }
    config() {
        // setting
        this.app.set(('port'), process.env.PORT || 4000);
        this.app.set('views', path_1.default.join(__dirname, '/views'));
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
        // Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        // config path files static
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
        console.log(path_1.default.resolve(__dirname, 'public'));
    }
    routes() {
        this.app.use(indexRoute_1.default);
        this.app.use('/api', rtRoute_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
