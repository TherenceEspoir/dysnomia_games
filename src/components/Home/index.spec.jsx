import {render, screen } from "@testing-library/react" ;
import { describe, expect, it } from 'vitest' ;

import Results from './view';

describe("Home", () => {
    
    it(`It renders without values`, () => {
		const games = [];
        function handleChange(){} ;
        const title = "Rien" ;

		render(
			<Results games={games} handleChange={handleChange} title={title} />
		);

        expect(screen.getAllByText(new RegExp("Rien", 'i'))[0]).toBeInTheDocument() ;
	});


	it(`It renders with values`, () => {
        const games = [
            {
                name: "test", 
                rating : 0.2, 
                id:  258
            }
        ] ;
        function handleChange(){} ;
        const title = "Un film" ;

		render(
			<Results games={games} handleChange={handleChange} title={title} />
		);

        expect(screen.getAllByText(new RegExp("Un film", 'i'))[0]).toBeInTheDocument() ;
        expect(screen.getAllByText(new RegExp("test", 'i'))[0]).toBeInTheDocument() ;
	});
  });