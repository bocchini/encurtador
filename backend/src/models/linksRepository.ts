import linkModel, { ILinkModel } from "./linkModel";
import { Link } from "./link";

async function findByCode(code: string) {
  return await linkModel.findOne<ILinkModel>({ where: { code } });
}

async function findByUrl(url: string) {
  console.log("url: " + url);
  return await linkModel.findOne<ILinkModel>({ where: { url } });
}

async function add(link: Link) {
  const existsUrl = await findByUrl(link.url);
  console.log(existsUrl);
  if (existsUrl) return existsUrl;
  return await linkModel.create<ILinkModel>(link);
}

async function hit(code: string) {
  const link = await findByCode(code);
  if (!link) return null;

  link.hits!++;
  await link.save();
  return link;
}

export default {
  findByCode,
  add,
  hit,
};
