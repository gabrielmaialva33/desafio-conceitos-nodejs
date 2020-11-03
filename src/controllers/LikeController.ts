import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Repository from '../models/Repository';

export default {
  // -> create
  async create(request: Request, response: Response): Promise<Response> {
    const repoRepository = getRepository(Repository);

    const { id } = request.params;

    const repo = await repoRepository.findOne({ where: { id } });
    if (!repo) {
      return response.status(404).json({ error: 'Repository not found' });
    }

    repo.likes += 1;

    await repoRepository.save(repo);

    return response.json(repo);
  },
};
