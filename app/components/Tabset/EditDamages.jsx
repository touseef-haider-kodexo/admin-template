/* eslint-disable indent */
/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as S from "./styled";
import { calculatePercentage } from "../../utils/calcPercentage";
import {
  getRAndIPriceForTechnician,
  getRAndIPriceForTPA,
  getTotalTechnicianPricePerDent,
  getTotalInternalPricePerDent,
} from "../../utils/dentPriceCalculation";

function EditDamages(props) {
  const { dents, claim_info } = useSelector((state) => state?.claim);
  const [dentsArray, setDentsArray] = useState([]);
  const [sum, setSum] = useState(0);
  const [sumTpa, setSumTpa] = useState(0);

  const [, setTotalPrice] = useState({
    totalTechnicianPrice: 0,
    totalInternalPrice: 0,
  });

  useEffect(() => {
    let sum = 0;
    let sumTpa = 0;
    props?.techPrice?.map((a) => {
      sum += calculateAdditionalPriceOfTechnician(a);
      sumTpa += calculateAdditionalPriceOfTPA(a);
    });
    setSum(sum);
    setSumTpa(sumTpa);
  }, [props?.additionalItems?.slice(0), props?.additionalClaimItems]);

  useEffect(() => {
    let twoDArray = [];
    let sameIds = dents?.filter((dent, index, self) => {
      return (
        self.findIndex((t) => t.title === dent.title) === index &&
        dent.title !== undefined
      );
    });
    sameIds?.map((dent) => {
      let d = dents?.filter((d) => d.title === dent.title);
      twoDArray.push([...d]);
    });
    let technicianTotal = 0;
    let internalTotal = 0;

    twoDArray?.map((dent) => {
      technicianTotal += getTechnicianTotal(dent);
    });

    twoDArray?.map((dent) => {
      internalTotal += getInternalTotal(dent);
    });

    setTotalPrice({
      totalTechnicianPrice: technicianTotal,
      totalInternalPrice: internalTotal,
    });
    // sending child to parent
    props?.setTotalInternalPrice(internalTotal);
    props?.setTotalTechnicalPrice(technicianTotal);
    props?.setConstantTechnicalPrice(technicianTotal);
    props?.setConstantInternalPrice(internalTotal);
  }, [props?.technician, claim_info?.TPA]);

  const technicianAddOnPrice = (dent, technician) => {
    let { add_ons } = dent || {};
    if (!Array.isArray(add_ons) || add_ons.length <= 0) return 0;

    let total = 0;
    const dent_price = getTotalTechnicianPricePerDent(dent, technician);

    add_ons?.map((add_on) => {
      let add_on_technician_price;

      add_on_technician_price = technician?.technician_misc_categories?.find(
        (t_a_on) => {
          return t_a_on?.misc_category_id === add_on?.category?._id;
        },
      )?.technician_price;

      if (add_on?.add_on_technician_price) {
        total += add_on?.add_on_technician_price ?? 0;
      } else if (add_on_technician_price) {
        total += calculatePercentage(add_on_technician_price, dent_price);
      } else if (!add_on?.add_on_technician_price) {
        total +=
          calculatePercentage(
            add_on?.add_on_default_price,
            dent_price ?? dent?.dent_category?.price,
          ) ?? 0;
        total += 0;
      }
    });

    return total;
  };

  const internalAddOnPrice = (dent, TPA) => {
    let { add_ons } = dent || {};
    if (!Array.isArray(add_ons) || add_ons.length <= 0) return 0;

    let total = 0;

    const dent_price = getTotalInternalPricePerDent(dent, TPA);

    add_ons?.map((add_on) => {
      let add_on_internal_price;

      add_on_internal_price = TPA?.tpa_misc_categories?.find(
        (t_a_on) => t_a_on?.misc_category_id?._id === add_on?.category?._id,
      )?.internal_price;

      if (add_on?.add_on_internal_price) {
        total += add_on?.add_on_internal_price;
      } else if (add_on_internal_price) {
        total += calculatePercentage(add_on_internal_price, dent_price);
      } else if (!add_on?.add_on_internal_price) {
        total +=
          calculatePercentage(
            add_on?.add_on_default_price,
            dent_price ?? dent?.dent_category?.price,
          ) ?? 0;
        total += 0;
      }
    });

    return total;
  };
  const getTechnicianTotal = (dent) => {
    // console.log(typeof dent);
    let result = 0;
    dent?.map((d) => {
      result +=
        getTotalTechnicianPricePerDent(d, props?.technician) +
        technicianAddOnPrice(d, props?.technician) +
        getRAndIPriceForTechnician(
          d,
          props?.technician,
          d?.amount && d?.amount,
          d?.r_and_i[0],
        );
    });
    return result;
  };
  const getInternalTotal = (dent) => {
    let result = 0;
    dent?.map((d) => {
      result +=
        getTotalInternalPricePerDent(d, claim_info?.TPA) +
        internalAddOnPrice(d, claim_info?.TPA) +
        getRAndIPriceForTPA(
          d,
          claim_info?.TPA,
          d?.amount && d?.amount,
          d?.r_and_i[0],
        );
    });
    return result;
  };

  useEffect(() => {
    let twoDArray = [];
    let sameIds = dents?.filter((dent, index, self) => {
      return (
        self.findIndex((t) => t.title === dent.title) === index &&
        dent.title !== undefined
      );
    });
    sameIds?.map((dent) => {
      let d = dents.filter((d) => d.title === dent.title);
      twoDArray.push([...d]);
    });

    setDentsArray(twoDArray);
  }, []);

  const calculateAdditionalPriceOfTechnician = (item) => {
    let Techtotal = 0;
    let techAdditionalClaimItems = props?.technician?.additional_claim?.find(
      (claimItem) => {
        return claimItem?.category === item?.claim_items;
      },
    );
    if (item?.price > 0) {
      Techtotal += item?.price;
    } else if (item?.technician_price) {
      Techtotal += item?.technician_price;
    } else if (techAdditionalClaimItems?.technician_price) {
      Techtotal += techAdditionalClaimItems?.technician_price;
    } else {
      Techtotal += props?.additionalClaimItems?.find(
        (i) => i?._id === item?.claim_items,
      )?.price;
    }

    return isNaN(Techtotal) ? 0 : Techtotal;
  };

  const calculateAdditionalPriceOfTPA = (item) => {
    let TPAtotal = 0;
    let tpaAdditionalClaimItems = claim_info?.TPA?.additional_claim?.find(
      (claimItem) => {
        return claimItem?.category === item?.claim_items;
      },
    );
    if (item?.price > 0) {
      TPAtotal += item?.price;
    } else if (item?.internal_price) {
      TPAtotal += item?.internal_price;
    } else if (tpaAdditionalClaimItems?.internal_price) {
      TPAtotal += tpaAdditionalClaimItems?.internal_price;
    } else {
      TPAtotal += props?.additionalClaimItems?.find(
        (i) => i?._id === item?.claim_items,
      )?.price;
    }

    return isNaN(TPAtotal) ? 0 : TPAtotal;
  };
  return (
    <S.EditDamages>
      <div className="damages">
        <div className="damages-table">
          {dentsArray?.map((dent) => (
            <>
              <div className="damages-table-head">
                <span className="damages-paragraph">
                  {dent[0]?.title} ( {dent?.length} )
                </span>
                <span className="damages-paragraph">Technician</span>
                <span className="damages-paragraph">Internal</span>
              </div>
              {dent?.map((d) => (
                <>
                  <div className="damages-body">
                    <p>{d?.title} </p>
                    <p>
                      {d?.add_ons?.map((addon) => (
                        <span>{addon?.category?.name},</span>
                      ))}
                    </p>
                    <p>
                      $
                      {(
                        getTotalTechnicianPricePerDent(d, props?.technician) +
                        technicianAddOnPrice(d, props?.technician)
                      ).toLocaleString()}
                    </p>
                    <p>
                      $
                      {(
                        getTotalInternalPricePerDent(d, claim_info?.TPA) +
                        internalAddOnPrice(d, claim_info?.TPA)
                      ).toLocaleString()}
                    </p>
                  </div>
                </>
              ))}

              <small style={{ margin: "0px 10px", fontSize: "13px" }}>
                {dent?.map((d) => (
                  <span>{d?.r_and_i?.length > 0 && "R&I"}</span>
                ))}
              </small>

              {dent?.map((d) =>
                d?.r_and_i?.length > 0
                  ? (d?.r_and_i).map((r_and_i) => (
                      <div className="damages-body" style={{ border: "none" }}>
                        <p> {r_and_i?.name}</p>
                        <p></p>
                        <p>
                          $
                          {getRAndIPriceForTechnician(
                            d,
                            props?.technician,
                            d?.amount && d?.amount,
                            d?.r_and_i[0],
                          )}
                        </p>
                        <p>
                          $
                          {getRAndIPriceForTPA(
                            d,
                            claim_info?.TPA,
                            d?.amount && d?.amount,
                            d?.r_and_i[0],
                          )}
                        </p>
                      </div>
                    ))
                  : null,
              )}
              <div className="damages-table-foot">
                <p></p>
                <p className="damages-foot-paragraph">
                  ${getTechnicianTotal(dent).toLocaleString()}
                </p>
                <p className="damages-foot-paragraph">
                  ${getInternalTotal(dent).toLocaleString()}
                </p>
              </div>
            </>
          ))}
          {props?.additionalItems?.length > 0 && (
            <>
              <div className="damages-table-head">
                <span className="damages-paragraph">
                  Additional Claim Items
                </span>
                <span className="damages-paragraph">Technician</span>
                <span className="damages-paragraph">Internal</span>
              </div>
              {props?.additionalItems?.map((d) => (
                <>
                  <div className="damages-body">
                    <p>
                      {
                        props?.additionalClaimItems?.find(
                          (ac) => ac?._id === d?.claim_items,
                        )?.name
                      }{" "}
                    </p>
                    <p></p>
                    <p>${calculateAdditionalPriceOfTechnician(d)}</p>
                    <p>${calculateAdditionalPriceOfTPA(d)}</p>
                  </div>
                </>
              ))}

              <div className="damages-table-foot">
                <p></p>
                <p className="damages-foot-paragraph">${sum}</p>
                <p className="damages-foot-paragraph">${sumTpa}</p>
              </div>
            </>
          )}
          <div
            style={{
              marginBottom: "25px",
              marginTop: "20px",
            }}
          >
            <div className="damages-body" style={{ border: "1px solid white" }}>
              <span>Totals</span>
              <p></p>

              <span>
                <b>${Number(props?.totalTechnicalPrice).toLocaleString()}</b>
              </span>
              <span>
                <b>${Number(props?.totalInternalPrice).toLocaleString()}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </S.EditDamages>
  );
}

EditDamages.propTypes = {};

export default EditDamages;
