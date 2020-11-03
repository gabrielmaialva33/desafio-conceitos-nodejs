import request from 'supertest';
import { validate as isUuid } from 'uuid';

describe('Repositories', () => {
  it('should be able to create a new repository', async () => {
    const response = await request('http://localhost:3333')
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      url: 'https://github.com/Rocketseat/umbriel',
      title: 'Umbriel',
      techs: ['Node', 'Express', 'TypeScript'],
      likes: 0,
    });
  });

  it('should be able to list the repositories', async () => {
    const repository = await request('http://localhost:3333')
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      });

    const response = await request('http://localhost:3333').get(
      '/repositories',
    );

    expect(response.body).toEqual(expect.arrayContaining([response.body[0]]));
  });

  it('should be able to update repository', async () => {
    const repository = await request('http://localhost:3333')
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      });

    const response = await request('http://localhost:3333')
      .put(`/repositories/${repository.body.id}`)
      .send({
        url: 'https://github.com/Rocketseat/unform',
        title: 'Unform',
        techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      url: 'https://github.com/Rocketseat/unform',
      title: 'Unform',
      techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
    });
  });

  it('should not be able to update a repository that does not exist', async () => {
    await request('http://localhost:3333').put(`/repositories/123`).expect(404);
  });

  it('should not be able to update repository likes manually', async () => {
    const repository = await request('http://localhost:3333')
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
      });

    await request('http://localhost:3333').post(
      `/repositories/${repository.body.id}/like`,
    );

    const response = await request('http://localhost:3333')
      .put(`/repositories/${repository.body.id}`)
      .send({
        likes: 15,
      });

    expect(response.body).toMatchObject({
      likes: 1,
    });
  });

  it('should be able to delete the repository', async () => {
    const response = await request('http://localhost:3333')
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      });

    await request('http://localhost:3333')
      .delete(`/repositories/${response.body.id}`)
      .expect(204);

    const repositories = await request('http://localhost:3333').get(
      '/repositories',
    );

    const repository = repositories.body.find(
      (r: { id: any }) => r.id === response.body.id,
    );

    expect(repository).toBe(undefined);
  });

  it('should not be able to delete a repository that does not exist', async () => {
    await request('http://localhost:3333')
      .delete(`/repositories/123`)
      .expect(404);
  });
});
