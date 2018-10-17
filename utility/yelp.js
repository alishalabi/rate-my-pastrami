// This is a helper file, designed to handle the functionality
// needed to use Yelp's API.
// This file is modeled after Joe Rezendez' "Ravenous" website:
// https://github.com/joerez/ravenous/blob/master/ravenous/src/util/Yelp.js

const clientId = "pkClYmkwqzFdCbvKB6Y0nA"
const secretId = "YoETtuuDdq_-aGWyTvzQAO1aM8Up4L-NoHaWI39BphK_hFJtM2n0Jyfbtm0aUNkNGDCJLirNlYo4L71WlC--Cg-wCrnCGpNArNMRwBEuws7cGNKQd4Ie6_400vvEW3Yx"

let token;

const Yelp = {

  // // To-do: Athorization
  // getToken() {
  //
  // }

  search(location, sortBy) {
    return fetch(`https://api.yelp.com/v3/businesses/search?term=pastrami&location=${location}&sort_by=${sortBy}`)
  }.then(response => {
    return response.json();
  }).then(jsonResponse.business => {
    return jsonResponse.business.map(business => ({
      id: business.id,
      imageSrc: business.image_url,
      name: business.name,
      address: business.location.address1,
      city: business.location.city,
      state: business.location.state,
      zipCode: business.location.zip_code,
      category: business.categories[0].title,
      rating: business.rating,
      reviewCount: business.review_count
    }))
  })
}

module
