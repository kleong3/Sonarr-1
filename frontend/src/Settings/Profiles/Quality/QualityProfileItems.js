import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import QualityProfileItemDragSource from './QualityProfileItemDragSource';
import QualityProfileItemDragPreview from './QualityProfileItemDragPreview';
import styles from './QualityProfileItems.css';

class QualityProfileItems extends Component {

  //
  // Render

  render() {
    const {
      editGroups,
      dragIndex,
      dropIndex,
      qualityProfileItems,
      errors,
      warnings,
      onToggleEditGroupsMode,
      ...otherProps
    } = this.props;

    const isDragging = dropIndex !== null;
    const isDraggingUp = isDragging && dropIndex > dragIndex;
    const isDraggingDown = isDragging && dropIndex <= dragIndex;

    return (
      <FormGroup>
        <FormLabel>
          Qualities

          <IconButton
            className={styles.editGroupsButton}
            name={editGroups ? icons.REORDER : icons.GROUP}
            title={editGroups ? 'Reorder' : 'Edit Groups'}
            onPress={onToggleEditGroupsMode}
          />
        </FormLabel>

        <div>
          <FormInputHelpText
            text="Qualities higher in the list are more preferred. Only checked qualities are wanted"
          />

          {
            errors.map((error, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={error.message}
                  isError={true}
                  isCheckInput={false}
                />
              );
            })
          }

          {
            warnings.map((warning, index) => {
              return (
                <FormInputHelpText
                  key={index}
                  text={warning.message}
                  isWarning={true}
                  isCheckInput={false}
                />
              );
            })
          }

          <div className={styles.qualities}>
            {
              qualityProfileItems.map(({ id, name, allowed, quality, items }, index) => {
                const identifier = quality ? quality.id : id;

                return (
                  <QualityProfileItemDragSource
                    key={identifier}
                    editGroups={editGroups}
                    groupId={id}
                    qualityId={quality && quality.id}
                    name={quality ? quality.name : name}
                    allowed={allowed}
                    items={items}
                    sortIndex={index}
                    isInGroup={false}
                    isDragging={isDragging}
                    isDraggingUp={isDraggingUp}
                    isDraggingDown={isDraggingDown}
                    {...otherProps}
                  />
                );
              }).reverse()
            }

            <QualityProfileItemDragPreview />
          </div>
        </div>
      </FormGroup>
    );
  }
}

QualityProfileItems.propTypes = {
  editGroups: PropTypes.bool.isRequired,
  dragIndex: PropTypes.number,
  dropIndex: PropTypes.number,
  qualityProfileItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
  warnings: PropTypes.arrayOf(PropTypes.object),
  onToggleEditGroupsMode: PropTypes.func.isRequired
};

QualityProfileItems.defaultProps = {
  errors: [],
  warnings: []
};

export default QualityProfileItems;
