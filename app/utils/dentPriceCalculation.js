/* eslint-disable */
export const getTotalTechnicianPricePerDent = (dent, technician) => {
  try {
    const { dent_category, category_price } = dent;

    // calculate category price
    if (!dent_category) return 0;

    const dent_technician_price = dent?.technician_price || 0;

    const t_c_p = technician?.technician_category?.find(
      (tc) => tc?.category === dent_category?.child_id,
    )?.technician_price;

    let total = 0;

    if (dent_technician_price) {
      total += dent_technician_price;
    } else {
      total +=
        (category_price ? Number(category_price) : t_c_p) ??
        dent_category?.price;
    }

    // eslint-disable-next-line
    return isNaN(total) ? 0 : total;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalInternalPricePerDent = (dent, TPA) => {
  try {
    const { dent_category } = dent;

    if (!dent_category) return 0;

    const dent_internal_price = dent?.internal_price || 0;
    const tpa_c_p =
      TPA &&
      TPA?.tpa_categories?.find(
        (tpa_c) => tpa_c?.category?._id === dent_category?.child_id,
      )?.internal_price;

    let total = 0;

    if (dent_internal_price) {
      total += dent_internal_price;
    } else {
      total +=
        (tpa_c_p
          ? tpa_c_p > 0
            ? tpa_c_p
            : dent_category?.price
          : dent_category?.price) ?? dent_category?.price;
    }
    // eslint-disable-next-line
    return isNaN(total) ? 0 : total;
  } catch (error) {
    console.log("erorr", error);
  }
};

export const getRAndIPriceForTechnician = (
  dent,
  technician,
  amount,
  r_and_i,
) => {
  const dent_technician_r_and_i_price = dent?.technician_r_and_i_price;
  const t_r_n_i_price = technician?.technician_misc_categories?.find(
    (t_r_n_i) => t_r_n_i?.misc_category_id === r_and_i?._id,
  )?.technician_price;
  if (dent_technician_r_and_i_price) {
    return dent_technician_r_and_i_price;
  }
  const result = Number(
    amount
      ? Number(amount)
      : t_r_n_i_price
      ? Number(t_r_n_i_price)
      : Number(r_and_i?.price),
  );
  // eslint-disable-next-line
  return isNaN(result) ? 0 : result;
};

export const getRAndIPriceForTPA = (dent, TPA, amount, r_and_i) => {
  const dent_tpa_r_and_i_price = dent?.tpa_r_and_i_price;
  const tpa_r_n_i_price =
    TPA &&
    TPA?.tpa_misc_categories?.find(
      (tpa_r_n_i) => tpa_r_n_i?.misc_category_id?._id === r_and_i?._id,
    )?.internal_price;
  if (dent_tpa_r_and_i_price) {
    return dent_tpa_r_and_i_price;
  }
  // eslint-ternary-spacing
  const result = Number(
    amount
      ? amount
      : tpa_r_n_i_price
      ? Number(tpa_r_n_i_price)
      : Number(r_and_i?.price),
  );
  // eslint-disable-next-line
  return isNaN(result) ? 0 : result;
};
