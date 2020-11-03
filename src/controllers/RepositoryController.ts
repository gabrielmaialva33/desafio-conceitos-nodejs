import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Repository from '../models/Repository';

export default {
  // -> index
  async index(request: Request, response: Response): Promise<Response> {
    const repoRepository = getRepository(Repository);

    const repoList = await repoRepository.find();

    return response.json(repoList);
  },

  // -> create
  async create(request: Request, response: Response): Promise<Response> {
    const repoRepository = getRepository(Repository);

    const { title, url, techs } = request.body;

    const repo = repoRepository.create({ title, url, techs });
    await repoRepository.save(repo);

    return response.status(201).json(repo);
  },

  // -> update
  async update(request: Request, response: Response): Promise<Response> {
    const repoRepository = getRepository(Repository);

    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repo = await repoRepository.findOne({ where: { id } });
    if (!repo) {
      return response.status(404).json({ error: 'Repository not found' });
    }

    repo.title = title;
    repo.url = url;
    repo.techs = techs;

    await repoRepository.save(repo);

    return response.json(repo);
  },

  // -> delete
  async delete(request: Request, response: Response): Promise<Response> {
    const repoRepository = getRepository(Repository);

    const { id } = request.params;

    const repo = await repoRepository.findOne({ where: { id } });
    if (!repo) {
      return response.status(404).json({ error: 'Repository not found' });
    }

    await repoRepository.remove(repo);

    return response.status(204).json({ msg: 'Repository has be deleted' });
  },
};
