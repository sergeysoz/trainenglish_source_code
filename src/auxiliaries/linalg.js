const sigma = 180 / Math.PI;
const degToRad = (deg) => deg / sigma;

export const applyRotation = (v, a) => {
  a = degToRad(a);
  return [
    v[0] * Math.cos(a) + v[1] * -Math.sin(a),
    v[0] * Math.sin(a) + v[1] * Math.cos(a),
  ];
};
