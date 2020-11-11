import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import CardContent from '../cardContent.js'

describe('<CardContent /> Component', () => {
    test('renders', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<CardContent data={[]} isLoading={false} />);
        const result = renderer.getRenderOutput();

        expect(result.props.children).toEqual([false,
            <article key={'No Records'}>
                <div class="text">
                    <h5 className='missionTitle'><b>No Records to Display</b></h5>
                </div>
            </article>
        ]);

    });
});