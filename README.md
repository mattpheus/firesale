# firesale
the simple e-commerce app

http://fire-sale.surge.sh/

## description and user story 
-It is a React Router website, with full CRUD that display's a simple B2B retail list of products.

## technologies & packages
-React, Javacript, CSS and HTML

## launch/build 
-using the link provided. 

## major problems & solutions
-State and lifecycle management.

## MVP
-Having full CRUD usage.

## FUTURE -> databases and relations; APIs; component library
-adding user account sign up.
-searching
-more properties to be displayed on screen
-having more data points and api's
-profile management area
-proper protected routes.
-modern styling


## _code snippet_
  handleCards = () => {
        return this.state.products.map(product => {
            return (
                <Card key={product.id}>
                    <br></br>
                    <Link to={`product/${product.id}`}>
                        <Image className="logo" src={product.image} alt={product.name} />
                    </Link>
                    <Container className='card-details' key={product.id}>
                        Category: {product.category}
                        <br></br>
                        Name: {product.name}
                        <br></br>
                        Description: {product.description}
                    </Container>
                    <UpdateProduct placeholder="Edit Description Here" productId={product.id} fetchProducts={this.fetchProducts} />
                    <hr></hr>
                    {/* {product.description} */}
                </Card>
                
            )
        })
    }

-Created a card that could be dynamically used in other parts of the website.

## This is an example photo of the app
 ![firesale](client/src/components/images/firesale.png)

