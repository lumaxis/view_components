# frozen_string_literal: true

module Primer
  # The Tooltip component is a wrapper component that will apply a tooltip
  class TooltipComponent < Primer::Component
    DIRECTION_DEFAULT = nil
    ALIGNMENT_DEFAULT = nil
    MULTILINE_DEFAULT = false
    DELAY_DEFAULT = true

    DIRECTION_OPTIONS = [DIRECTION_DEFAULT] + %w(
      nw
      n
      ne
      w
      e
      sw
      s
      se
    )

    ALIGNMENT_OPTIONS = [ALIGNMENT_DEFAULT] + %w(
      right-1
      left-1
      right-2
      left-2
      right-1
      left-1
      right-2
      left-2
    )

    # @example 50|Default
    #   <%= render(Primer::TooltipComponent.new(label: "Even bolder")) { "Bold Text" } %>
    #
    # @example 50|With a direction
    #   <%= render(Primer::TooltipComponent.new(label: "Even bolder", direction: "nw")) { "Bold Text" } %>
    #
    # @example 50|With an alignment
    #   <%= render(Primer::TooltipComponent.new(label: "Even bolder", alignment: "right-1")) { "Bold Text" } %>
    #
    # @example 50|Without a delay
    #   <%= render(Primer::TooltipComponent.new(label: "Even bolder", delay: false)) { "Bold Text" } %>
    #
    # @param label [String] the text to appear in the tooltip
    # @param direction [String] Specify the direction of a tooltip with north, south, east, and west directions
    # @param alignment [String] Align tooltips to the left or right of an element, combined with a directional class to specify north or south
    # @param multiline [Boolean] Use this when you have long content
    # @param delay [Boolean] By default the tooltips have a slight delay before appearing. Set false to override this
    # @param system_arguments [Hash] <%= link_to_system_arguments_docs %>
    def initialize(
      label:,
      direction: DIRECTION_DEFAULT,
      alignment: ALIGNMENT_DEFAULT,
      multiline: ALIGNMENT_DEFAULT,
      delay: DELAY_DEFAULT,
      **system_arguments
    )
      @system_arguments = system_arguments
      @system_arguments[:tag] ||= :span
      @system_arguments[:aria] = { label: label }

      @system_arguments[:classes] = class_names(
        @system_arguments[:classes],
        "tooltipped",
        "tooltipped-#{fetch_or_fallback(DIRECTION_OPTIONS, direction, DIRECTION_DEFAULT)}" => direction.present?,
        "tooltipped-align-#{fetch_or_fallback(ALIGNMENT_OPTIONS, alignment, ALIGNMENT_DEFAULT)}" => alignment.present?,
        "tooltipped-no-delay" => fetch_or_fallback_boolean(!delay, !DELAY_DEFAULT),
        "tooltipped-multiline" => fetch_or_fallback_boolean(multiline, MULTILINE_DEFAULT),
      )
    end

    def call
      render(Primer::BaseComponent.new(**@system_arguments)) { content }
    end
  end
end
