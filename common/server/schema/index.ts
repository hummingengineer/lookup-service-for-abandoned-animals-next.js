import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`
  type Sido {
    orgCd: String
    orgdownNm: String
  }

  type Sigungu {
    orgCd: String
    orgdownNm: String
    uprCd: String
  }

  type Shelter {
    careNm: String
    careRegNo: String
  }

  type Kind {
    KNm: String
    kindCd: String
  }

  type AbandonmentPublic {
    age: String
    careAddr: String
    careNm: String
    careTel: String
    chargeNm: String
    colorCd: String
    desertionNo: String
    filename: String
    happenDt: String
    happenPlace: String
    kindCd: String
    neuterYn: String
    noticeComment: String
    noticeEdt: String
    noticeNo: String
    noticeSdt: String
    officetel: String
    orgNm: String
    popfile: String
    processState: String
    sexCd: String
    specialMark: String
    weight: String
  }

  type SidoResponse {
    resultCode: String
    resultMsg: String
    item: [Sido]
  }

  type SigunguResponse {
    resultCode: String
    resultMsg: String
    item: [Sigungu]
  }

  type ShelterResponse {
    resultCode: String
    resultMsg: String
    item: [Shelter]
  }

  type KindResponse {
    resultCode: String
    resultMsg: String
    item: [Kind]
  }

  type AbandonmentPublicResponse {
    resultCode: String
    resultMsg: String
    item: [AbandonmentPublic]
    numOfRows: String
    pageNo: String
    totalCount: String
  }

  type Query {
    sido: SidoResponse
    sigungu(upr_cd: String!): SigunguResponse
    shelter(upr_cd: String!, org_cd: String!): ShelterResponse
    kind(up_kind_cd: String!): KindResponse
    abandonmentPublic(
      bgnde: String
      endde: String
      upkind: String
      kind: String
      upr_cd: String
      org_cd: String
      care_reg_no: String
      state: String
      pageNo: String
      numOfRows: String
      neuter_yn: String
    ): AbandonmentPublicResponse
  }
`;

export default typeDefs;
