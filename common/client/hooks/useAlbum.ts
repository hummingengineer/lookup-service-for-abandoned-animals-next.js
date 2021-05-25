import useQuery from './useQuery';
import { Criteria } from '../types';

export default function useAlbum(criteria: Criteria) {
  const query = `
  {
    abandonmentPublic(
                      bgnde: "${criteria.bgnde}",
                      endde: "${criteria.endde}",
                      upkind: "${criteria.upkind}",
                      kind: "${criteria.kind}",
                      upr_cd: "${criteria.sido}",
                      org_cd: "${criteria.sigungu}",
                      care_reg_no: "${criteria.shelter}",
                      state: "${criteria.state}",
                      pageNo: "${criteria.pageNo}",
                      numOfRows: "${criteria.numOfRows}",
                      neuter_yn: "${criteria.neuter_yn}")
                      {
                        item
                        {
                          age
                          careAddr
                          careNm
                          careTel
                          chargeNm
                          colorCd
                          desertionNo
                          happenDt
                          happenPlace
                          kindCd
                          neuterYn
                          noticeComment
                          noticeEdt
                          noticeNo
                          noticeSdt
                          officetel
                          orgNm
                          popfile
                          processState
                          sexCd
                          specialMark
                          weight
                        }
                        totalCount
                      }
  }`;

  const { data, isLoading, isError } = useQuery(query);

  return {
    cards: data?.abandonmentPublic.item,
    totalCount: data?.abandonmentPublic.totalCount,
    isLoading,
    isError,
  };
}
