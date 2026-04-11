import { it, expect } from 'vitest';
import { formatUlistContent } from '../../frontend/src/utils';
import { videos } from '../vue/mocks/videos';

it('formats content for ulist', () => {
    expect(formatUlistContent(videos.data)).toMatchSnapshot();
});
