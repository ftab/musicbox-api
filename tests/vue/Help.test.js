import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import Help from '../../frontend/src/views/Help.vue';

it('shows a help page', async () => {
    const wrapper = mount(Help);

    expect(wrapper.text()).toContain('How it works');
});
