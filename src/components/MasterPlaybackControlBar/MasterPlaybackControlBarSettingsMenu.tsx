import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Icon, List, ListItem, Popper, Slide, Divider } from '@material-ui/core';
import { Check, ChevronLeft, ChevronRight } from '@material-ui/icons';
import { ControlsMode, Layout, State } from '../../redux/types';
import { getControlsMode, getLayout } from '../../redux/selectors';
import { changeControlsMode, changeLayout } from '../../redux/actions';
import {
    SettingsMenuContainer,
    SettingsMenuDescriptionListItemCheckmarContainer,
    SettingsMenuDescriptionListItemContainer,
    SettingsMenuDescriptionListItemSubitleContainer,
    SettingsMenuDescriptionListItemTextContainer,
    SettingsMenuDescriptionListItemTitleContainer,
    SettingsMenuListItemContainer,
    SettingsMenuListItemTitle,
    SettingsMenuListItemValue,
    SettingsMenuListItemValueContainer,
    SettingsMenuPaper,
    SettingsMenuSectionHeader,
} from './style';

interface OwnProps {
    isOpen: boolean;
    anchorElement: Element | null;
}

interface StateProps {
    controlsMode: ControlsMode;
    layout: Layout;
}

interface DispatchProps {
    changeControlsMode: (controlsMode: ControlsMode) => void;
    changeLayout: (layout: Layout) => void;
}

export type MasterPlaybackControlBarSettingsMenuProps = OwnProps & StateProps & DispatchProps;

const MasterPlaybackControlBarSettingsMenu: React.FC<MasterPlaybackControlBarSettingsMenuProps> = ({
    isOpen,
    anchorElement,
    controlsMode,
    layout,
    changeControlsMode,
    changeLayout,
}) => {
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

    useEffect(() => {
        setSelectedMenuIndex(0);
    }, [isOpen]);

    const popperProps = {
        open: isOpen,
        anchorEl: anchorElement,
        placement: 'top' as 'top',
        style: {
            zIndex: 10000,
            pointerEvents: 'none' as 'none',
        },
    };

    const settingsMenuContainerHeight = [80, 288, 267][selectedMenuIndex];

    const slideBaseProps = {
        appear: false,
        mountOnEnter: true,
        unmountOnExit: true,
    };

    return (
        <Popper {...popperProps}>
            <SettingsMenuContainer>
                <SettingsMenuPaper height={settingsMenuContainerHeight}>
                    <Slide {...slideBaseProps} direction="right" in={selectedMenuIndex === 0}>
                        <List dense>
                            <ListItem button onClick={() => setSelectedMenuIndex(1)}>
                                <SettingsMenuListItemContainer>
                                    <SettingsMenuListItemTitle>Layout</SettingsMenuListItemTitle>
                                    <SettingsMenuListItemValueContainer>
                                        <SettingsMenuListItemValue>{layout}</SettingsMenuListItemValue>
                                        <Icon>
                                            <ChevronRight />
                                        </Icon>
                                    </SettingsMenuListItemValueContainer>
                                </SettingsMenuListItemContainer>
                            </ListItem>
                            <ListItem button onClick={() => setSelectedMenuIndex(2)}>
                                <SettingsMenuListItemContainer>
                                    <SettingsMenuListItemTitle>Controls</SettingsMenuListItemTitle>
                                    <SettingsMenuListItemValueContainer>
                                        <SettingsMenuListItemValue>{controlsMode}</SettingsMenuListItemValue>
                                        <Icon>
                                            <ChevronRight />
                                        </Icon>
                                    </SettingsMenuListItemValueContainer>
                                </SettingsMenuListItemContainer>
                            </ListItem>
                        </List>
                    </Slide>

                    <Slide {...slideBaseProps} direction="left" in={selectedMenuIndex === 1}>
                        <List dense>
                            <ListItem button onClick={() => setSelectedMenuIndex(0)}>
                                <SettingsMenuSectionHeader>
                                    <Icon style={{ marginLeft: '-8px', marginRight: '8px' }}>
                                        <ChevronLeft />
                                    </Icon>
                                    <SettingsMenuListItemTitle>Layout</SettingsMenuListItemTitle>
                                </SettingsMenuSectionHeader>
                            </ListItem>
                            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                            <ListItem button onClick={() => changeLayout(Layout.Focused)}>
                                <SettingsMenuDescriptionListItemContainer>
                                    <SettingsMenuDescriptionListItemCheckmarContainer>
                                        {layout === Layout.Focused ? (
                                            <Icon>
                                                <Check />
                                            </Icon>
                                        ) : null}
                                    </SettingsMenuDescriptionListItemCheckmarContainer>
                                    <SettingsMenuDescriptionListItemTextContainer>
                                        <SettingsMenuDescriptionListItemTitleContainer>Focused</SettingsMenuDescriptionListItemTitleContainer>
                                        <SettingsMenuDescriptionListItemSubitleContainer>
                                            One or more big players at the top, the rest in a list of small players at the bottom.
                                        </SettingsMenuDescriptionListItemSubitleContainer>
                                    </SettingsMenuDescriptionListItemTextContainer>
                                </SettingsMenuDescriptionListItemContainer>
                            </ListItem>
                            <ListItem button onClick={() => changeLayout(Layout.Overlay)}>
                                <SettingsMenuDescriptionListItemContainer>
                                    <SettingsMenuDescriptionListItemCheckmarContainer>
                                        {layout === Layout.Overlay ? (
                                            <Icon>
                                                <Check />
                                            </Icon>
                                        ) : null}
                                    </SettingsMenuDescriptionListItemCheckmarContainer>
                                    <SettingsMenuDescriptionListItemTextContainer>
                                        <SettingsMenuDescriptionListItemTitleContainer>Overlay</SettingsMenuDescriptionListItemTitleContainer>
                                        <SettingsMenuDescriptionListItemSubitleContainer>
                                            One big player in the middle, the rest in an overlaid list at the top right.
                                        </SettingsMenuDescriptionListItemSubitleContainer>
                                    </SettingsMenuDescriptionListItemTextContainer>
                                </SettingsMenuDescriptionListItemContainer>
                            </ListItem>
                            <ListItem button onClick={() => changeLayout(Layout.Grid)}>
                                <SettingsMenuDescriptionListItemContainer>
                                    <SettingsMenuDescriptionListItemCheckmarContainer>
                                        {layout === Layout.Grid ? (
                                            <Icon>
                                                <Check />
                                            </Icon>
                                        ) : null}
                                    </SettingsMenuDescriptionListItemCheckmarContainer>
                                    <SettingsMenuDescriptionListItemTextContainer>
                                        <SettingsMenuDescriptionListItemTitleContainer>Grid</SettingsMenuDescriptionListItemTitleContainer>
                                        <SettingsMenuDescriptionListItemSubitleContainer>
                                            A grid of equally sized players.
                                        </SettingsMenuDescriptionListItemSubitleContainer>
                                    </SettingsMenuDescriptionListItemTextContainer>
                                </SettingsMenuDescriptionListItemContainer>
                            </ListItem>
                        </List>
                    </Slide>

                    <Slide {...slideBaseProps} direction="left" in={selectedMenuIndex === 2}>
                        <List dense>
                            <ListItem button onClick={() => setSelectedMenuIndex(0)}>
                                <SettingsMenuSectionHeader>
                                    <Icon style={{ marginLeft: '-8px', marginRight: '8px' }}>
                                        <ChevronLeft />
                                    </Icon>
                                    <SettingsMenuListItemTitle>Controls</SettingsMenuListItemTitle>
                                </SettingsMenuSectionHeader>
                            </ListItem>
                            <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                            <ListItem button onClick={() => changeControlsMode(ControlsMode.Individual)}>
                                <SettingsMenuDescriptionListItemContainer>
                                    <SettingsMenuDescriptionListItemCheckmarContainer>
                                        {controlsMode === ControlsMode.Individual ? (
                                            <Icon>
                                                <Check />
                                            </Icon>
                                        ) : null}
                                    </SettingsMenuDescriptionListItemCheckmarContainer>
                                    <SettingsMenuDescriptionListItemTextContainer>
                                        <SettingsMenuDescriptionListItemTitleContainer>Individual</SettingsMenuDescriptionListItemTitleContainer>
                                        <SettingsMenuDescriptionListItemSubitleContainer>
                                            Show controls for each player individually. Keyboard and mouse actions will be executed on the hovered player.
                                        </SettingsMenuDescriptionListItemSubitleContainer>
                                    </SettingsMenuDescriptionListItemTextContainer>
                                </SettingsMenuDescriptionListItemContainer>
                            </ListItem>
                            <ListItem button onClick={() => changeControlsMode(ControlsMode.Grouped)}>
                                <SettingsMenuDescriptionListItemContainer>
                                    <SettingsMenuDescriptionListItemCheckmarContainer>
                                        {controlsMode === ControlsMode.Grouped ? (
                                            <Icon>
                                                <Check />
                                            </Icon>
                                        ) : null}
                                    </SettingsMenuDescriptionListItemCheckmarContainer>
                                    <SettingsMenuDescriptionListItemTextContainer>
                                        <SettingsMenuDescriptionListItemTitleContainer>Grouped</SettingsMenuDescriptionListItemTitleContainer>
                                        <SettingsMenuDescriptionListItemSubitleContainer>
                                            Only show the main controls. Keyboard and mouse actions will affect all players at the same time.
                                        </SettingsMenuDescriptionListItemSubitleContainer>
                                    </SettingsMenuDescriptionListItemTextContainer>
                                </SettingsMenuDescriptionListItemContainer>
                            </ListItem>
                        </List>
                    </Slide>
                </SettingsMenuPaper>
            </SettingsMenuContainer>
        </Popper>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    createStructuredSelector({
        controlsMode: getControlsMode,
        layout: getLayout,
    }),
    {
        changeControlsMode,
        changeLayout,
    },
)(MasterPlaybackControlBarSettingsMenu);
