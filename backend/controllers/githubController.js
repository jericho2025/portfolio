export function createGithubController(service) {
  return async function getGithub(req, res) {
    res.json(await service.getOverview());
  };
}
