import { Router } from 'express';

import LikeController from './controllers/LikeController';
import RepositoryController from './controllers/RepositoryController';

const routes = Router();

routes.get('/repositories', RepositoryController.index);
routes.post('/repositories', RepositoryController.create);
routes.put('/repositories/:id', RepositoryController.update);
routes.delete('/repositories/:id', RepositoryController.delete);

routes.post('/repositories/:id/like', LikeController.create);

export default routes;
