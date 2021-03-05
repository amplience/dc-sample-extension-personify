import { personifyApi } from '../config/personify.json';

const { v4: uuidv4 } = require('uuid');

export type PersonifyRequest = {
  sessionid?: string;
  shopperid?: string;
  pagesize?: number;
  contentname: string;
  referrer: string;
};

export type PersonifyMission = {
  val: number;
  name: string;
  id: number;
};

export type PersonifyMissionTag = {
  tag_name: string;
  tag_score: number;
};

export type PersonifyData = {
  propensity: number;
  missions: PersonifyMission[];
  mission_tags: PersonifyMissionTag[];
  recommendations: any[];
};

export default function personifyViewContent(req: PersonifyRequest): Promise<PersonifyData> {
  const { sessionid = uuidv4(), shopperid = 'UNKNOWN', pagesize = 0, contentname, referrer } = req;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionid,
      shopperid,
      pagesize,
      contentname,
      referrer,
    }),
  };
  return fetch(`https://${personifyApi}/viewcontent`, requestOptions).then((x) => x.json());
}
